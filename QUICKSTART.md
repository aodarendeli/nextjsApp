# 🚀 Quick Start - Deploy to VPS

Complete deployment in 5 minutes.

## TL;DR - Copy & Paste

### On your local machine:

```bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -f ~/.ssh/freestudio-deploy -C "freestudio"

# 2. Add to VPS (replace with your VPS IP)
ssh-copy-id -i ~/.ssh/freestudio-deploy.pub user@YOUR_VPS_IP

# 3. Copy private key for GitHub secret
cat ~/.ssh/freestudio-deploy | pbcopy  # macOS
# OR on Linux
cat ~/.ssh/freestudio-deploy | xclip -selection clipboard

# 4. Push your repo to GitHub (if not already)
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### On your VPS:

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# 2. Create network
docker network create freestudio-next
```

### On GitHub:

Go to: **Settings → Secrets and variables → Actions**

Click **New repository secret** and add:

1. **VPS_HOST** = `your.vps.ip.address`
2. **VPS_USERNAME** = `ubuntu` (or your SSH user)
3. **VPS_SSH_KEY** = paste the private key (what you copied with pbcopy)

## Done! 🎉

Push to `main` branch:

```bash
git add .
git commit -m "Deploy: setup GitHub Actions"
git push origin main
```

Go to your repository → **Actions** tab and watch the deployment.

Your app will be live at: `http://YOUR_VPS_IP:3005`

---

## Detailed Guides

- [GitHub Setup Guide](./GITHUB_SETUP.md) - Step-by-step instructions
- [Deployment Guide](./DEPLOYMENT.md) - Full documentation
- [VPS Setup Script](./vps-setup.sh) - Automated setup

## Common Commands

```bash
# Check app status on VPS
ssh -i ~/.ssh/freestudio-deploy user@YOUR_VPS_IP "docker ps"

# View logs
ssh -i ~/.ssh/freestudio-deploy user@YOUR_VPS_IP "docker logs freestudio-next -f"

# Restart app
ssh -i ~/.ssh/freestudio-deploy user@YOUR_VPS_IP "docker restart freestudio-next"

# Stop app
ssh -i ~/.ssh/freestudio-deploy user@YOUR_VPS_IP "docker stop freestudio-next"
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| GitHub Actions fails with "Permission denied" | Make sure you pasted the **private key** in VPS_SSH_KEY secret, not public key |
| Can't SSH to VPS | Run `ssh-copy-id` command again, verify IP address is correct |
| Docker image pull fails | Log into GitHub Container Registry: `docker login ghcr.io` with your username and GitHub token |
| Port 3005 already in use | Run `sudo lsof -i :3005` and kill the process, or change port in docker-compose.deploy.yml |

## Environment Variables

Your app will use these from `.env.production`:

- `NEXT_PUBLIC_APP_URL` - Your production domain or VPS IP
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
- `NEXT_PUBLIC_API_URL` - API endpoint
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - true/false

Edit on VPS before first deployment, or push changes and redeploy.

## Next Steps

1. ✅ Generate SSH key
2. ✅ Add to VPS
3. ✅ Add GitHub Secrets
4. ✅ Prepare VPS
5. ✅ Push to GitHub
6. ✅ Monitor Actions tab
7. ✅ Access app on port 3005

That's it! Your CI/CD pipeline is live. 🚀
