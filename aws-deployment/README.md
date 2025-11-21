# AWS Deployment Guide for CHIRP CMS

This guide provides step-by-step instructions for deploying CHIRP CMS to AWS using ECS (Elastic Container Service) with Fargate.

## Architecture Overview

The deployment creates the following AWS resources:

- **ECR (Elastic Container Registry)** - Docker image storage
- **ECS Fargate** - Managed container orchestration
- **RDS PostgreSQL** - Managed database (replaces containerized PostgreSQL)
- **EFS (Elastic File System)** - Shared storage for media files
- **Application Load Balancer** - Traffic distribution and health checks
- **VPC & Security Groups** - Network isolation and security
- **Secrets Manager** - Secure storage for API keys and secrets
- **CloudWatch Logs** - Application logging

## Prerequisites

Before starting, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured

   ```bash
   # Install AWS CLI (macOS)
   brew install awscli

   # Configure AWS credentials
   aws configure
   ```

3. **Docker** installed and running
4. **OpenSSL** (for generating secrets)

## Deployment Steps

### Step 1: Setup ECR Repository

Create an Elastic Container Registry to store your Docker images.

```bash
cd aws-deployment
chmod +x scripts/*.sh
./scripts/01-setup-ecr.sh
```

**What this does:**

- Creates an ECR repository named `chirp-cms`
- Enables image scanning for vulnerabilities
- Sets up lifecycle policy to keep only the last 10 images

### Step 2: Build and Push Docker Image

Build your application and push it to ECR.

```bash
./scripts/02-build-and-push.sh
```

**What this does:**

- Authenticates Docker to your ECR repository
- Builds the Docker image using your Dockerfile
- Tags the image with `latest` and pushes to ECR

**Options:**

```bash
# Build with custom tag
IMAGE_TAG=v1.0.0 ./scripts/02-build-and-push.sh

# Use different AWS region
AWS_REGION=us-west-2 ./scripts/02-build-and-push.sh
```

### Step 3: Setup AWS Infrastructure

Create all necessary AWS infrastructure (this takes 10-15 minutes).

```bash
./scripts/03-setup-infrastructure.sh
```

**What this creates:**

1. **Security Groups**
   - ALB security group (allows HTTP/HTTPS from internet)
   - ECS security group (allows traffic from ALB on port 3000)
   - RDS security group (allows PostgreSQL from ECS)
   - EFS security group (allows NFS from ECS)

2. **RDS PostgreSQL Database**
   - Instance type: db.t4g.micro (customizable)
   - PostgreSQL 16.3
   - 20GB storage
   - 7-day backup retention
   - Password stored in Secrets Manager

3. **EFS File System**
   - Encrypted at rest
   - Mount targets in multiple availability zones
   - Used for `/app/media` directory

4. **Application Load Balancer**
   - Internet-facing
   - HTTP listener on port 80
   - Target group with health checks on `/admin`

5. **IAM Roles**
   - ECS task execution role (for pulling images and accessing secrets)
   - ECS task role (for application permissions)

**Configuration:**

```bash
# Use default VPC (recommended for simplicity)
USE_DEFAULT_VPC=true ./scripts/03-setup-infrastructure.sh

# Use larger database instance
DB_INSTANCE_CLASS=db.t4g.small ./scripts/03-setup-infrastructure.sh

# Different region
AWS_REGION=us-west-2 ./scripts/03-setup-infrastructure.sh
```

**Important:** This script saves configuration to `infrastructure-config.env`. Keep this file secure as it contains database credentials.

### Step 4: Create ECS Cluster

Create an ECS cluster to run your containers.

```bash
./scripts/04-create-ecs-cluster.sh
```

**What this does:**

- Creates ECS cluster with Fargate capacity provider
- Enables both FARGATE and FARGATE_SPOT (for cost savings)

### Step 5: Deploy Application to ECS

Deploy your application to the ECS cluster.

```bash
./scripts/05-deploy-to-ecs.sh
```

**What this does:**

1. **Prompts for configuration:**
   - Production domain (e.g., `cms.chirpradio.org`)
   - Frontend URL
   - Resend API key (optional)
   - OpenAI API key (optional)

2. **Stores secrets** in AWS Secrets Manager:
   - PAYLOAD_SECRET (auto-generated if not provided)
   - Database password
   - API keys

3. **Registers ECS task definition** with:
   - Container configuration
   - Environment variables
   - EFS volume mount
   - Health checks
   - CloudWatch logging

4. **Creates/updates ECS service**:
   - Runs 1 task (configurable)
   - Connects to load balancer
   - Auto-scaling ready

**The deployment takes 3-5 minutes** to reach steady state.

## Post-Deployment Setup

### 1. Configure DNS

Point your domain to the Application Load Balancer:

```bash
# Get your Load Balancer DNS from the deployment output
# Create a CNAME record:
# cms.chirpradio.org → chirp-cms-alb-123456789.us-east-1.elb.amazonaws.com
```

### 2. Setup HTTPS (Recommended)

#### Request SSL Certificate:

```bash
# Request certificate in AWS Certificate Manager
aws acm request-certificate \
  --domain-name cms.chirpradio.org \
  --validation-method DNS \
  --region us-east-1
```

#### Add HTTPS Listener to Load Balancer:

```bash
# After certificate is validated, add HTTPS listener
# Get the certificate ARN from ACM console
source infrastructure-config.env

aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTPS \
  --port 443 \
  --certificates CertificateArn=arn:aws:acm:region:account:certificate/xxx \
  --default-actions Type=forward,TargetGroupArn=$TG_ARN \
  --region $AWS_REGION
```

#### Optional: Redirect HTTP to HTTPS

```bash
# Modify the HTTP listener to redirect to HTTPS
LISTENER_ARN=$(aws elbv2 describe-listeners \
  --load-balancer-arn $ALB_ARN \
  --query 'Listeners[?Port==`80`].ListenerArn' \
  --output text \
  --region $AWS_REGION)

aws elbv2 modify-listener \
  --listener-arn $LISTENER_ARN \
  --default-actions Type=redirect,RedirectConfig="{Protocol=HTTPS,Port=443,StatusCode=HTTP_301}" \
  --region $AWS_REGION
```

### 3. Create First Admin User

Visit your admin panel and create your first user:

```
https://cms.chirpradio.org/admin
```

### 4. Import Existing Data (Optional)

If you have existing data to import, connect to an ECS task:

```bash
# Get task ARN
TASK_ARN=$(aws ecs list-tasks \
  --cluster chirp-cms-cluster \
  --service-name chirp-cms-service \
  --query 'taskArns[0]' \
  --output text \
  --region us-east-1)

# Execute command in running container
aws ecs execute-command \
  --cluster chirp-cms-cluster \
  --task $TASK_ARN \
  --container chirp-cms \
  --command "/bin/sh" \
  --interactive \
  --region us-east-1

# Then run your seed scripts
npm run seed
```

## Updating Your Application

To deploy updates:

```bash
# 1. Build and push new image
./scripts/02-build-and-push.sh

# 2. Deploy to ECS (will force new deployment)
./scripts/05-deploy-to-ecs.sh
```

Or to force a redeployment without rebuilding:

```bash
aws ecs update-service \
  --cluster chirp-cms-cluster \
  --service chirp-cms-service \
  --force-new-deployment \
  --region us-east-1
```

## Monitoring & Troubleshooting

### View Application Logs

```bash
# Tail logs in real-time
aws logs tail /ecs/chirp-cms --follow --region us-east-1

# View recent logs
aws logs tail /ecs/chirp-cms --since 1h --region us-east-1

# Filter for errors
aws logs tail /ecs/chirp-cms --follow --filter-pattern "ERROR" --region us-east-1
```

### Check Service Status

```bash
aws ecs describe-services \
  --cluster chirp-cms-cluster \
  --services chirp-cms-service \
  --region us-east-1
```

### Check Task Health

```bash
# List running tasks
aws ecs list-tasks \
  --cluster chirp-cms-cluster \
  --service-name chirp-cms-service \
  --region us-east-1

# Describe specific task
aws ecs describe-tasks \
  --cluster chirp-cms-cluster \
  --tasks <task-arn> \
  --region us-east-1
```

### Check Load Balancer Health

```bash
source infrastructure-config.env

aws elbv2 describe-target-health \
  --target-group-arn $TG_ARN \
  --region $AWS_REGION
```

### Common Issues

#### Task keeps restarting

```bash
# Check logs for errors
aws logs tail /ecs/chirp-cms --since 30m --region us-east-1

# Common causes:
# - Database connection issues
# - Missing environment variables
# - Health check failing
# - Insufficient memory/CPU
```

#### Can't access admin panel

```bash
# Check security group allows traffic
# Check target group health
# Verify DNS is pointing to load balancer
# Check CloudWatch logs for errors
```

#### Database connection errors

```bash
# Verify RDS is running
aws rds describe-db-instances \
  --db-instance-identifier chirp-cms-db \
  --region us-east-1

# Check security group allows traffic from ECS
```

## Scaling

### Horizontal Scaling (More Tasks)

```bash
# Increase to 3 tasks
aws ecs update-service \
  --cluster chirp-cms-cluster \
  --service chirp-cms-service \
  --desired-count 3 \
  --region us-east-1
```

### Vertical Scaling (More CPU/Memory)

Edit `aws-deployment/ecs/task-definition-template.json`:

```json
{
  "cpu": "1024",     // 1 vCPU (was 512)
  "memory": "2048",  // 2GB (was 1GB)
  ...
}
```

Then redeploy:

```bash
./scripts/05-deploy-to-ecs.sh
```

### Auto Scaling

Create auto-scaling policy:

```bash
# Register scalable target
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/chirp-cms-cluster/chirp-cms-service \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 1 \
  --max-capacity 5 \
  --region us-east-1

# Create scaling policy based on CPU
aws application-autoscaling put-scaling-policy \
  --service-namespace ecs \
  --scalable-dimension ecs:service:DesiredCount \
  --resource-id service/chirp-cms-cluster/chirp-cms-service \
  --policy-name cpu-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration file://scaling-policy.json \
  --region us-east-1
```

## Cost Optimization

### Estimated Monthly Costs

- **ECS Fargate (1 task, 0.5 vCPU, 1GB):** ~$15-20
- **RDS PostgreSQL (db.t4g.micro):** ~$15-20
- **Application Load Balancer:** ~$16
- **EFS:** ~$0.30/GB + requests
- **Data Transfer:** Variable

**Total:** ~$50-60/month for small workload

### Cost Saving Tips

1. **Use Fargate Spot** for non-critical tasks (up to 70% savings)
2. **Schedule downtime** for development environments
3. **Use smaller RDS instance** (db.t4g.micro is free tier eligible)
4. **Enable EFS Infrequent Access** for media files
5. **Set up CloudWatch alarms** for unexpected costs

## Backup & Disaster Recovery

### Database Backups

RDS automatically creates daily backups (7-day retention). To increase:

```bash
aws rds modify-db-instance \
  --db-instance-identifier chirp-cms-db \
  --backup-retention-period 14 \
  --region us-east-1
```

### Manual Snapshot

```bash
aws rds create-db-snapshot \
  --db-instance-identifier chirp-cms-db \
  --db-snapshot-identifier chirp-cms-backup-$(date +%Y%m%d) \
  --region us-east-1
```

### EFS Backup

Enable AWS Backup for EFS:

```bash
# Create backup vault
aws backup create-backup-vault \
  --backup-vault-name chirp-cms-backups \
  --region us-east-1

# Create backup plan (use AWS Backup console for easier setup)
```

## Cleanup / Teardown

To remove all resources and stop incurring charges:

```bash
# Delete ECS service
aws ecs update-service \
  --cluster chirp-cms-cluster \
  --service chirp-cms-service \
  --desired-count 0 \
  --region us-east-1

aws ecs delete-service \
  --cluster chirp-cms-cluster \
  --service chirp-cms-service \
  --force \
  --region us-east-1

# Delete ECS cluster
aws ecs delete-cluster \
  --cluster chirp-cms-cluster \
  --region us-east-1

# Delete RDS instance (final snapshot recommended)
aws rds delete-db-instance \
  --db-instance-identifier chirp-cms-db \
  --final-db-snapshot-identifier chirp-cms-final-snapshot \
  --region us-east-1

# Delete other resources (ALB, target groups, EFS, security groups, etc.)
# Note: Order matters due to dependencies
```

**Warning:** This will delete all data. Make sure you have backups!

## Support & Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS Fargate Pricing](https://aws.amazon.com/fargate/pricing/)
- [Payload CMS Documentation](https://payloadcms.com/docs)

## Security Checklist

- [ ] Database password stored in Secrets Manager
- [ ] RDS not publicly accessible
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Security groups follow principle of least privilege
- [ ] CloudWatch logs enabled for auditing
- [ ] Regular security updates via new image deployments
- [ ] IAM roles use minimum required permissions
- [ ] EFS and RDS encrypted at rest
- [ ] VPC flow logs enabled (optional but recommended)
