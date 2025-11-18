# Docker Deployment Guide for CHIRP CMS

This guide covers dockerizing and running CHIRP CMS in Docker containers, including database migration from SQLite to PostgreSQL.

## Table of Contents

- [Quick Start](#quick-start)
- [Database Migration](#database-migration)
- [Production Deployment](#production-deployment)
- [AWS Deployment](#aws-deployment)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- Docker Desktop or Docker Engine (20.10+)
- Docker Compose (2.0+)

### Running with Docker Compose

1. **Copy environment configuration:**

   ```bash
   cp .env.docker .env
   ```

2. **Update environment variables:**

   Edit `.env` and set your values (especially `PAYLOAD_SECRET` and `RESEND_API_KEY`)

3. **Start all services:**

   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database (port 5432)
   - CHIRP CMS application (port 3000)

4. **Access the application:**

   - Admin Panel: http://localhost:3000/admin
   - API: http://localhost:3000/api
   - GraphQL: http://localhost:3000/api/graphql

5. **View logs:**

   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f app
   docker-compose logs -f db
   ```

6. **Stop services:**

   ```bash
   docker-compose down
   ```

### Optional: Run with pgAdmin

pgAdmin is included for database management but disabled by default to save resources.

```bash
# Start with pgAdmin
docker-compose --profile tools up -d

# Access pgAdmin at http://localhost:5050
# Login: admin@chirpradio.org / admin
```

To connect to the database in pgAdmin:
- Host: `db`
- Port: `5432`
- Database: `chirp_cms`
- Username: `chirp`
- Password: `chirp_dev_password`

---

## Database Migration

### Migrating from SQLite to PostgreSQL

If you have existing data in SQLite, follow these steps to migrate to PostgreSQL:

#### Option 1: Export and Re-import Data (Recommended)

1. **Export data from SQLite:**

   ```bash
   # Make sure you're using SQLite
   export DATABASE_URI=file:./payload.db

   # Run export script
   npm run export
   ```

   This creates backup files in a `backups/` directory.

2. **Start PostgreSQL with Docker:**

   ```bash
   docker-compose up -d db
   ```

3. **Update environment for PostgreSQL:**

   ```bash
   # .env file
   DATABASE_URI=postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms
   ```

4. **Run Payload migrations:**

   ```bash
   # This creates the schema in PostgreSQL
   npm run build
   ```

5. **Import data to PostgreSQL:**

   ```bash
   npm run restore
   ```

6. **Verify data migration:**

   ```bash
   # Start the app
   docker-compose up -d app

   # Check admin panel
   open http://localhost:3000/admin
   ```

#### Option 2: Manual SQL Migration

For advanced users, you can use tools like `pgloader`:

```bash
# Install pgloader (macOS)
brew install pgloader

# Convert SQLite to PostgreSQL
pgloader payload.db postgresql://chirp:chirp_dev_password@localhost:5432/chirp_cms
```

**Note:** This may require schema adjustments for Payload-specific tables.

### Media Files Migration

Media files are stored in the `media/` directory. For Docker deployments:

**Local Development:**
- Files are mounted as a volume: `./media:/app/media`
- No migration needed

**Production (AWS):**
- Migrate to S3 for scalability
- See [AWS Deployment](#aws-deployment) section

---

## Production Deployment

### Building the Production Image

```bash
# Build the image
docker build -t chirp-cms:latest .

# Run the container
docker run -d \
  --name chirp-cms \
  -p 3000:3000 \
  -e DATABASE_URI=postgresql://user:pass@your-db-host:5432/chirp_cms \
  -e PAYLOAD_SECRET=your-secret-key \
  -e PAYLOAD_PUBLIC_SERVER_URL=https://cms.chirpradio.org \
  -e RESEND_API_KEY=re_your_key \
  -v /path/to/media:/app/media \
  chirp-cms:latest
```

### Environment Variables for Production

Required:
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Strong random secret (generate with: `openssl rand -base64 32`)
- `PAYLOAD_PUBLIC_SERVER_URL` - Your public CMS URL
- `RESEND_API_KEY` - Email API key

Optional:
- `OPENAI_API_KEY` - For AI alt text generation
- `FRONTEND_URL` - Frontend URL(s) for CORS
- `EMAIL_FROM` - Email sender address
- `EMAIL_FROM_NAME` - Email sender name

### Health Checks

The Docker image includes a health check endpoint:

```bash
# Check container health
docker ps

# Manual health check
curl http://localhost:3000/api/health
```

### Security Best Practices

1. **Use secrets management:**
   - Never commit `.env` files
   - Use Docker secrets or AWS Secrets Manager
   - Rotate secrets regularly

2. **Run as non-root:**
   - Container runs as user `nextjs` (UID 1001)
   - Media directory has proper permissions

3. **Network isolation:**
   - Database in private subnet (AWS)
   - Only expose necessary ports
   - Use security groups/firewalls

4. **Keep images updated:**
   ```bash
   # Update base images
   docker pull node:20-alpine
   docker build --no-cache -t chirp-cms:latest .
   ```

---

## AWS Deployment

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    AWS Cloud                             │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Application Load Balancer             │  │
│  │         (SSL/TLS termination, HTTPS)             │  │
│  └──────────────────┬───────────────────────────────┘  │
│                     │                                   │
│  ┌──────────────────▼───────────────────────────────┐  │
│  │              ECS Fargate Service                 │  │
│  │  ┌─────────────────┐    ┌─────────────────┐     │  │
│  │  │ CMS Container 1 │    │ CMS Container 2 │     │  │
│  │  │  (Auto-scaling) │    │  (Auto-scaling) │     │  │
│  │  └────────┬────────┘    └────────┬────────┘     │  │
│  └───────────┼──────────────────────┼──────────────┘  │
│              │                      │                  │
│  ┌───────────▼──────────────────────▼──────────────┐  │
│  │        Amazon RDS PostgreSQL                    │  │
│  │          (Multi-AZ for HA)                      │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Amazon S3 (Media Storage)                      │  │
│  │  ◄──── CloudFront CDN                           │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  AWS Secrets Manager                            │  │
│  │  (Environment variables & secrets)              │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Step-by-Step AWS Deployment

#### 1. Push Docker Image to ECR

```bash
# Authenticate to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Create ECR repository
aws ecr create-repository --repository-name chirp-cms --region us-east-1

# Tag and push image
docker tag chirp-cms:latest \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/chirp-cms:latest

docker push \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/chirp-cms:latest
```

#### 2. Create RDS PostgreSQL Instance

```bash
# Create database
aws rds create-db-instance \
  --db-instance-identifier chirp-cms-db \
  --db-instance-class db.t4g.micro \
  --engine postgres \
  --engine-version 16.1 \
  --master-username chirpadmin \
  --master-user-password YOUR_STRONG_PASSWORD \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxx \
  --db-subnet-group-name your-db-subnet-group \
  --backup-retention-period 7 \
  --multi-az \
  --region us-east-1
```

#### 3. Create S3 Bucket for Media

```bash
# Create bucket
aws s3 mb s3://chirp-cms-media --region us-east-1

# Configure CORS
cat > cors.json << 'EOF'
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://cms.chirpradio.org"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
EOF

aws s3api put-bucket-cors \
  --bucket chirp-cms-media \
  --cors-configuration file://cors.json
```

#### 4. Store Secrets in AWS Secrets Manager

```bash
# Create secret
aws secretsmanager create-secret \
  --name chirp-cms/production \
  --secret-string '{
    "PAYLOAD_SECRET": "your-secret-key",
    "RESEND_API_KEY": "re_your_key",
    "DATABASE_URI": "postgresql://chirpadmin:password@your-rds-endpoint:5432/chirp_cms"
  }' \
  --region us-east-1
```

#### 5. Create ECS Task Definition

Create `task-definition.json`:

```json
{
  "family": "chirp-cms",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::YOUR_ACCOUNT_ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::YOUR_ACCOUNT_ID:role/chirp-cms-task-role",
  "containerDefinitions": [
    {
      "name": "chirp-cms",
      "image": "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/chirp-cms:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PAYLOAD_PUBLIC_SERVER_URL",
          "value": "https://cms.chirpradio.org"
        },
        {
          "name": "S3_BUCKET",
          "value": "chirp-cms-media"
        },
        {
          "name": "AWS_REGION",
          "value": "us-east-1"
        }
      ],
      "secrets": [
        {
          "name": "PAYLOAD_SECRET",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:YOUR_ACCOUNT_ID:secret:chirp-cms/production:PAYLOAD_SECRET::"
        },
        {
          "name": "RESEND_API_KEY",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:YOUR_ACCOUNT_ID:secret:chirp-cms/production:RESEND_API_KEY::"
        },
        {
          "name": "DATABASE_URI",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:YOUR_ACCOUNT_ID:secret:chirp-cms/production:DATABASE_URI::"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/chirp-cms",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "node -e \"require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})\""],
        "interval": 30,
        "timeout": 10,
        "retries": 3,
        "startPeriod": 40
      }
    }
  ]
}
```

Register the task definition:

```bash
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json
```

#### 6. Create ECS Service

```bash
aws ecs create-service \
  --cluster your-cluster \
  --service-name chirp-cms \
  --task-definition chirp-cms \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=DISABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:YOUR_ACCOUNT_ID:targetgroup/chirp-cms/xxx,containerName=chirp-cms,containerPort=3000" \
  --region us-east-1
```

#### 7. Configure Auto-Scaling

```bash
# Register scalable target
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/your-cluster/chirp-cms \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 10

# Create scaling policy
aws application-autoscaling put-scaling-policy \
  --policy-name chirp-cms-cpu-scaling \
  --service-namespace ecs \
  --resource-id service/your-cluster/chirp-cms \
  --scalable-dimension ecs:service:DesiredCount \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration '{
    "TargetValue": 70.0,
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ECSServiceAverageCPUUtilization"
    }
  }'
```

### Infrastructure as Code (Terraform)

For automated infrastructure setup, see the Terraform templates in the `infrastructure/` directory (to be created).

---

## Troubleshooting

### Common Issues

#### 1. Container fails to start

**Check logs:**
```bash
docker-compose logs app
```

**Common causes:**
- Database not ready: Wait for database health check
- Missing environment variables: Check `.env` file
- Port already in use: Stop conflicting services

#### 2. Database connection errors

**Verify database is running:**
```bash
docker-compose ps db
```

**Test connection:**
```bash
docker-compose exec db psql -U chirp -d chirp_cms -c "SELECT 1;"
```

**Reset database:**
```bash
docker-compose down -v  # WARNING: Deletes all data
docker-compose up -d
```

#### 3. Permission errors with media uploads

**Fix permissions:**
```bash
chmod 755 media/
chown -R $(whoami) media/
```

**In Docker:**
```bash
docker-compose exec app chown -R nextjs:nodejs /app/media
```

#### 4. Build failures

**Clear Docker cache:**
```bash
docker-compose build --no-cache
```

**Check disk space:**
```bash
docker system df
docker system prune  # Clean up unused resources
```

### Getting Help

- **GitHub Issues**: [Report issues](https://github.com/chirpradio/chirp-cms/issues)
- **Docker Logs**: Always check logs first: `docker-compose logs -f`
- **Health Checks**: Monitor container health: `docker ps`

---

## Next Steps

- [ ] Set up CI/CD pipeline with GitHub Actions
- [ ] Configure S3 for media storage in production
- [ ] Set up CloudFront CDN for media delivery
- [ ] Implement automated backups
- [ ] Configure monitoring and alerts with CloudWatch
- [ ] Set up staging environment

For CI/CD setup, see [CICD.md](./CICD.md) (to be created).
