# Deployment Guide - FreeStudio

This guide explains how to deploy FreeStudio to your VPS with automated GitHub Actions CI/CD.

## Prerequisites

- VPS with Docker installed
- GitHub account with repository access
- SSH access to your VPS

## 1. VPS Setup

### Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Create Docker Network

```bash
docker network create freestudio-next
```

## 2. GitHub Configuration

### Generate SSH Key for VPS Access

```bash
# On your local machine
ssh-keygen -t ed25519 -f ~/.ssh/freestudio-deploy -C "freestudio-ci"

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/freestudio-deploy.pub user@your-vps-ip
```

### Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

- **VPS_HOST**: Your VPS IP address (e.g., `123.45.67.89`)
- **VPS_USERNAME**: SSH username (e.g., `ubuntu`, `root`)
- **VPS_SSH_KEY**: Content of your private SSH key (`.ssh/freestudio-deploy`)
- **VPS_SSH_PORT**: SSH port (optional, defaults to 22)

### Example: Setting SSH Key Secret

```bash
# Copy the private key content
cat ~/.ssh/freestudio-deploy | xclip -selection clipboard

# Or on macOS
cat ~/.ssh/freestudio-deploy | pbcopy
```

Then paste into the GitHub secret value.

## 3. GitHub Actions Workflow

The `.github/workflows/deploy.yml` file is already set up. It will:

1. Build Docker image on every push to `main` branch
2. Push image to GitHub Container Registry (GHCR)
3. SSH into your VPS
4. Pull the latest image
5. Stop old container and start new one
6. Expose app on port 3005

## 4. Manual Deployment (Without GitHub Actions)

If you prefer to deploy manually:

```bash
# 1. SSH into your VPS
ssh -i ~/.ssh/freestudio-deploy user@your-vps-ip

# 2. Create deployment directory
mkdir -p ~/freestudio
cd ~/freestudio

# 3. Clone your repository
git clone https://github.com/yourusername/your-repo.git .
cd your-repo

# 4. Copy environment file
cp .env.production .env.production
# Edit with your production values
nano .env.production

# 5. Build and run with Docker Compose
docker-compose -f docker-compose.deploy.yml up -d

# 6. Check status
docker-compose -f docker-compose.deploy.yml logs -f nexus-web
```

## 5. Monitoring and Maintenance

### View Logs

```bash
docker logs freestudio-next -f
```

### Restart Container

```bash
docker restart freestudio-next
```

### Stop Deployment

```bash
docker stop freestudio-next
docker rm freestudio-next
```

### Clean Up Images

```bash
docker image prune -a
```

## 6. Domain Configuration (Optional)

If you have a domain, set up Nginx reverse proxy:

1. Uncomment nginx section in `docker-compose.deploy.yml`
2. Create `nginx/nginx.conf`:

```nginx
server {
    listen 80;
    server_name freestudio.com www.freestudio.com;
    
    location / {
        proxy_pass http://nexus-web:3005;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. Run with domain:

```bash
docker-compose -f docker-compose.deploy.yml up -d
```

## 7. HTTPS Setup (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d freestudio.com -d www.freestudio.com

# Update Nginx config to use SSL
# Then restart Nginx container
```

## Environment Variables

### Development (.env.development)
- `NEXT_PUBLIC_APP_URL`: Local development URL (http://localhost:3000)
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: false

### Production (.env.production)
- `NEXT_PUBLIC_APP_URL`: Your production domain (https://freestudio.com)
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: true
- Update other API URLs as needed

## Troubleshooting

### Container won't start
```bash
docker logs freestudio-next
docker inspect freestudio-next
```

### Port already in use
```bash
# Change port in docker-compose.deploy.yml
# Or kill process using port 3005
sudo lsof -i :3005
sudo kill -9 <PID>
```

### GitHub Actions fails
- Check VPS_HOST, VPS_USERNAME, VPS_SSH_KEY in GitHub Secrets
- Verify SSH connection: `ssh -i key user@host`
- Check GitHub Actions logs in repository

### Image pull fails
- Ensure VPS Docker is logged into GHCR: `docker login ghcr.io`
- Use your GitHub token as password (generate in Settings → Developer settings)

## Deployment Checklist

- [ ] VPS has Docker installed
- [ ] SSH key configured and added to VPS
- [ ] GitHub Secrets configured (VPS_HOST, VPS_USERNAME, VPS_SSH_KEY)
- [ ] `.env.production` updated with real values
- [ ] `docker network create freestudio-next` executed on VPS
- [ ] First deployment tested manually (optional)
- [ ] Push to `main` branch to trigger GitHub Actions
- [ ] Check app running on `https://your-vps-ip:3005`

## Support

For issues or questions, check:
- GitHub Actions logs in your repository
- Docker logs: `docker logs freestudio-next`
- VPS system logs: `journalctl -u docker -n 50`
