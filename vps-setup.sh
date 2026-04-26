#!/bin/bash

# FreeStudio VPS Setup Script
# Run this on your VPS to prepare it for deployment

set -e

echo "=== FreeStudio VPS Setup ==="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Update system
echo -e "${BLUE}1. Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
echo -e "${BLUE}2. Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

# 3. Install Docker Compose
echo -e "${BLUE}3. Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

# 4. Create Docker network
echo -e "${BLUE}4. Creating Docker network...${NC}"
docker network create freestudio-next 2>/dev/null || echo -e "${GREEN}✓ Network already exists${NC}"

# 5. Create deployment directory
echo -e "${BLUE}5. Creating deployment directory...${NC}"
mkdir -p ~/freestudio
cd ~/freestudio

# 6. Verify installation
echo -e "${BLUE}6. Verifying installation...${NC}"
echo "Docker version: $(docker --version)"
echo "Docker Compose version: $(docker-compose --version)"

echo -e "${GREEN}=== VPS Setup Complete ===${NC}"
echo ""
echo "Next steps:"
echo "1. Add your GitHub SSH public key to ~/.ssh/authorized_keys"
echo "2. Configure GitHub Secrets in your repository:"
echo "   - VPS_HOST: $(hostname -I | awk '{print $1}')"
echo "   - VPS_USERNAME: $USER"
echo "   - VPS_SSH_KEY: (your private key content)"
echo "3. Push to main branch to trigger deployment"
echo ""
echo "To manually deploy:"
echo "  cd ~/freestudio"
echo "  git clone https://github.com/yourusername/repo.git ."
echo "  docker-compose -f docker-compose.deploy.yml up -d"
