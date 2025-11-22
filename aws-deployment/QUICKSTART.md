# Quick Start: Deploy CHIRP CMS to AWS

Get your CHIRP CMS deployed to AWS in 5 steps.

## Prerequisites

- AWS account with credentials configured (`aws configure`)
- Docker installed and running
- 15-20 minutes

## Deployment Steps

### 1. Setup ECR Repository

```bash
cd aws-deployment
./scripts/01-setup-ecr.sh
```

### 2. Build and Push Docker Image

```bash
./scripts/02-build-and-push.sh
```

### 3. Setup AWS Infrastructure

```bash
./scripts/03-setup-infrastructure.sh
```

⏱️ **Takes 10-15 minutes** - Creates RDS, EFS, ALB, security groups, and IAM roles.

Save the generated `infrastructure-config.env` file!

### 4. Create ECS Cluster

```bash
./scripts/04-create-ecs-cluster.sh
```

### 5. Deploy to ECS

```bash
./scripts/05-deploy-to-ecs.sh
```

You'll be prompted for:

- Production domain (e.g., `cms.chirpradio.org`)
- Frontend URL
- Resend API key (optional)
- OpenAI API key (optional)

⏱️ **Takes 3-5 minutes** to deploy.

## Post-Deployment

### Access Your Application

Your app will be available at the Load Balancer DNS shown in the deployment output.

Admin panel: `http://<alb-dns>/admin`

### Setup Domain & HTTPS

1. **Point your domain to the Load Balancer DNS**

   ```
   Create CNAME: cms.chirpradio.org → <alb-dns>
   ```

2. **Request SSL certificate in AWS Certificate Manager**

   ```bash
   aws acm request-certificate \
     --domain-name cms.chirpradio.org \
     --validation-method DNS \
     --region us-east-1
   ```

3. **Add HTTPS listener** (after certificate validation)
   ```bash
   # Use AWS Console or CLI to add HTTPS listener
   # See full README for detailed instructions
   ```

### Create Admin User

Visit `https://cms.chirpradio.org/admin` and create your first admin user.

## Monitoring

### View Logs

```bash
./scripts/view-logs.sh
```

### Check Status

```bash
./scripts/check-status.sh
```

## Updating

Deploy new versions:

```bash
./scripts/02-build-and-push.sh
./scripts/05-deploy-to-ecs.sh
```

## Help

- **Full documentation:** See `README.md`
- **Troubleshooting:** Check CloudWatch logs
- **AWS costs:** ~$50-60/month for small workload

## Architecture

```
Internet → ALB (HTTPS) → ECS Fargate Tasks → RDS PostgreSQL
                                  ↓
                                 EFS (media files)
```

**Resources created:**

- 1 ECS Cluster (Fargate)
- 1 RDS PostgreSQL instance
- 1 Application Load Balancer
- 1 EFS file system
- Security groups & IAM roles
- Secrets in AWS Secrets Manager

## Next Steps

1. ✅ Configure DNS and HTTPS
2. ✅ Create admin user
3. ✅ Import existing data (if any)
4. ✅ Set up monitoring/alerts
5. ✅ Configure backups
6. ✅ Review security checklist

See the full README for detailed instructions on all of these!
