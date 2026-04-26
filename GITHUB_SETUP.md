# GitHub Setup Guide

Step-by-step instructions to configure your GitHub repository for automated VPS deployment.

## Step 1: Create SSH Key Pair

Run this on your local machine:

```bash
# Generate SSH key (use descriptive name)
ssh-keygen -t ed25519 -f ~/.ssh/freestudio-deploy -C "freestudio-github-actions"

# You'll be prompted for passphrase - leave empty for CI/CD
```

This creates two files:
- `~/.ssh/freestudio-deploy` (private key - keep secret!)
- `~/.ssh/freestudio-deploy.pub` (public key - safe to share)

## Step 2: Add Public Key to VPS

SSH into your VPS and add your public key:

```bash
# On your local machine, copy the public key
cat ~/.ssh/freestudio-deploy.pub

# SSH to VPS
ssh user@your-vps-ip

# Add public key
mkdir -p ~/.ssh
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
exit
```

Verify connection works:
```bash
ssh -i ~/.ssh/freestudio-deploy user@your-vps-ip "docker --version"
```

## Step 3: Get Your VPS IP and Details

Note down:
- **VPS IP Address**: e.g., `123.45.67.89`
- **SSH Username**: Usually `ubuntu`, `debian`, `root`, etc.
- **SSH Port**: Usually `22` (if different, note it)

## Step 4: Add GitHub Secrets

Go to your GitHub repository:

```
Settings → Secrets and variables → Actions → New repository secret
```

Add these 3 secrets:

### Secret 1: VPS_HOST
- **Name**: `VPS_HOST`
- **Value**: Your VPS IP address (e.g., `123.45.67.89`)

### Secret 2: VPS_USERNAME
- **Name**: `VPS_USERNAME`
- **Value**: SSH username (e.g., `ubuntu`)

### Secret 3: VPS_SSH_KEY
- **Name**: `VPS_SSH_KEY`
- **Value**: Content of `~/.ssh/freestudio-deploy` (the private key)

To copy the private key:
```bash
# macOS
cat ~/.ssh/freestudio-deploy | pbcopy

# Linux
cat ~/.ssh/freestudio-deploy | xclip -selection clipboard

# Windows (PowerShell)
Get-Content ~/.ssh/freestudio-deploy | Set-Clipboard
```

### Optional Secret: VPS_SSH_PORT
If your SSH port is not 22:
- **Name**: `VPS_SSH_PORT`
- **Value**: Your SSH port (e.g., `2222`)

## Step 5: Initialize Git Repository (if needed)

If you haven't pushed to GitHub yet:

```bash
cd /path/to/your/nextjsApp
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

## Step 6: Prepare VPS

On your VPS, run the setup script:

```bash
# SSH into VPS
ssh -i ~/.ssh/freestudio-deploy user@your-vps-ip

# Run setup
bash -c "$(curl -fsSL https://raw.githubusercontent.com/yourusername/your-repo/main/vps-setup.sh)"

# Or manually:
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
docker network create freestudio-next
```

## Step 7: Configure Production Environment

On your VPS:

```bash
mkdir -p ~/freestudio
cd ~/freestudio
nano .env.production
```

Add your production environment variables:

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## Step 8: Test Deployment

### Test 1: Verify GitHub Actions Can See Secrets

Push a test commit to trigger the workflow:

```bash
git add .
git commit -m "Test: GitHub Actions workflow"
git push origin main
```

Go to: `GitHub → Actions` and check if workflow runs.

### Test 2: SSH Connection Test

GitHub Actions will try to SSH. Check the workflow logs for any SSH errors.

### Test 3: Manual Deployment Test (Optional)

Before relying on GitHub Actions, test manually:

```bash
# On your VPS
cd ~/freestudio
docker run -d \
  --name freestudio-test \
  -p 3005:3005 \
  ghcr.io/yourusername/your-repo:main

# Check if it's running
docker logs freestudio-test
curl http://localhost:3005

# Clean up
docker stop freestudio-test
docker rm freestudio-test
```

## Step 9: Deploy!

Once everything is configured, deployment is automatic:

1. Make changes locally
2. Commit and push to `main` branch
3. GitHub Actions automatically:
   - Builds Docker image
   - Pushes to GitHub Container Registry
   - SSH into VPS
   - Pulls new image
   - Restarts container
4. Your app is live on `https://your-vps-ip:3005`

## Troubleshooting

### ❌ GitHub Actions fails: "Permission denied (publickey)"

**Solution**: Check your VPS_SSH_KEY secret - it should be the PRIVATE key, not public.

```bash
# Get private key
cat ~/.ssh/freestudio-deploy
```

### ❌ Docker pull fails on VPS

**Solution**: Log Docker into GitHub Container Registry:

```bash
# On VPS
docker login ghcr.io
# Username: yourusername
# Password: Generate a Personal Access Token (PAT) in GitHub Settings
#           Settings → Developer settings → Personal access tokens → Tokens (classic)
#           Scopes: read:packages, write:packages
```

### ❌ Connection timeout to VPS

**Solution**: 
- Verify VPS_HOST is correct IP
- Check SSH port (usually 22)
- Ensure firewall allows SSH access
- Test manually: `ssh -i ~/.ssh/freestudio-deploy user@your-vps-ip`

### ❌ Port 3005 already in use on VPS

**Solution**:
```bash
# Find process using port 3005
sudo lsof -i :3005

# Kill it
sudo kill -9 <PID>

# Or change port in docker-compose.deploy.yml
```

### ❌ Container exits immediately

**Solution**: Check logs:
```bash
docker logs freestudio-next
```

Common issues:
- Missing environment variables
- Node version mismatch
- Build errors in application

## Security Notes

⚠️ **Important**:
- Never commit `.env.*` files with real secrets
- Keep SSH keys private (add to .gitignore)
- Use read-only SSH keys if possible
- Rotate keys periodically
- Monitor GitHub Actions logs for suspicious activity

## Quick Reference

```bash
# Copy private key to clipboard (for GitHub Secret)
cat ~/.ssh/freestudio-deploy | pbcopy

# Test SSH connection
ssh -i ~/.ssh/freestudio-deploy user@123.45.67.89 "docker ps"

# View GitHub Actions workflow
cat .github/workflows/deploy.yml

# Check deployment logs on VPS
docker logs freestudio-next -f

# Restart container
docker restart freestudio-next
```

## Next Steps

1. ✅ Create SSH key pair
2. ✅ Add public key to VPS
3. ✅ Add GitHub Secrets
4. ✅ Prepare VPS with Docker
5. ✅ Push code to GitHub
6. ✅ Monitor GitHub Actions
7. ✅ Access app on port 3005

Happy deploying! 🚀
