# Version 20240804.1 - Fixed for Headless/Webhook Execution
# This version handles the lack of TTY/TERM variables gracefully.

# --- Terminal Color Setup ---
# We check if TERM is set; if not, we default to empty strings to prevent tput errors.
ifeq ($(TERM),)
  GREEN  := 
  YELLOW := 
  RESET  := 
else
  GREEN  := $(shell tput setaf 2)
  YELLOW := $(shell tput setaf 3)
  RESET  := $(shell tput sgr0)
endif

# --- Common Logic ---
# Using a variable for the merge message to keep things clean
MERGE_MSG := "Automerged by Makefile"

.PHONY: deployTestBackend deployProdBackend deployTestFrontend deployProdFrontend \
        deployTestWebhooks deployProdWebhooks deployPeersTestBackend \
        deployPeersProdBackend deployPeersTestFrontend deployPeersProdFrontend

# --- Gateway Backend ---
deployTestBackend:
	@echo "$(GREEN)Deploying Test Backend...$(RESET)"
	cd /opt/ucs-icchw-gateway-backend && \
	git stash && git checkout dev && \
	git fetch && git merge origin/dev -m $(MERGE_MSG) && \
	npm install --silent && \
	pm2 restart gateway-backend && \
	echo "$(YELLOW)Test Backend Deployment Completed.$(RESET)"

deployProdBackend:
	@echo "$(GREEN)Deploying Prod Backend...$(RESET)"
	cd /opt/ucs-icchw-gateway-backend && \
	git stash && git checkout main && \
	git fetch && git merge origin/main -m $(MERGE_MSG) && \
	npm install --silent && \
	pm2 restart gateway-backend && \
	echo "$(YELLOW)Prod Backend Deployment Completed.$(RESET)"

# --- Gateway Frontend ---
deployTestFrontend:
	@echo "$(GREEN)Deploying Test Frontend...$(RESET)"
	cd /opt/ucs-icchw-gateway-frontend && \
	git stash && git checkout dev && \
	git fetch && git merge origin/dev -m $(MERGE_MSG) && \
	npm install --silent && \
	npm run build --silent && \
	echo "$(YELLOW)Test Frontend Deployment Completed.$(RESET)"

deployProdFrontend:
	@echo "$(GREEN)Deploying Prod Frontend...$(RESET)"
	cd /opt/ucs-icchw-gateway-frontend && \
	git stash && git checkout main && \
	git fetch && git merge origin/main -m $(MERGE_MSG) && \
	npm install --silent && \
	npm run build --silent && \
	echo "$(YELLOW)Prod Frontend Deployment Completed.$(RESET)"

# --- Gateway Webhooks ---
deployTestWebhooks:
	@echo "$(GREEN)Deploying Test Webhooks...$(RESET)"
	cd /opt/ucs-icchw-gateway-webhooks && \
	git stash && git checkout dev && \
	git fetch && git merge origin/dev -m $(MERGE_MSG) && \
	npm install --silent && \
	pm2 restart ucs-gateway-webhooks && \
	echo "$(YELLOW)Test Webhooks Deployment Completed.$(RESET)"

deployProdWebhooks:
	@echo "$(GREEN)Deploying Prod Webhooks...$(RESET)"
	cd /opt/ucs-icchw-gateway-webhooks && \
	git stash && git checkout main && \
	git fetch && git merge origin/main -m $(MERGE_MSG) && \
	npm install --silent && \
	pm2 restart ucs-gateway-webhooks && \
	echo "$(YELLOW)Prod Webhooks Deployment Completed.$(RESET)"

# --- UCS Peers Registration Backend ---
deployPeersTestBackend:
	@echo "$(GREEN)Deploying Peers Test Backend...$(RESET)"
	cd /opt/ucs-peers-register-backend && \
	git stash && git checkout dev && \
	git fetch && git merge origin/dev -m $(MERGE_MSG) && \
	npm install --silent --include=dev && \
	npm run build && \
	pm2 restart ucs-peers-backend && \
	echo "$(YELLOW)Peers Test Backend Deployment Completed.$(RESET)"

deployPeersProdBackend:
	@echo "$(GREEN)Deploying Peers Prod Backend...$(RESET)"
	cd /opt/ucs-peers-register-backend && \
	git stash && git checkout main && \
	git fetch && git merge origin/main -m $(MERGE_MSG) && \
	npm install --silent --include=dev && \
	npm run build --silent && \
	pm2 restart ucs-peers-backend && \
	echo "$(YELLOW)Peers Prod Backend Deployment Completed.$(RESET)"

# --- UCS Peers Registration Frontend ---
deployPeersTestFrontend:
	@echo "$(GREEN)Deploying Peers Test Frontend...$(RESET)"
	cd /opt/ucs-peers-register-frontend && \
	git stash && git checkout dev && \
	git fetch && git merge origin/dev -m $(MERGE_MSG) && \
	npm install && \
	npm run build && \
	echo "$(YELLOW)Peers Test Frontend Deployment Completed.$(RESET)"

deployPeersProdFrontend:
	@echo "$(GREEN)Deploying Peers Prod Frontend...$(RESET)"
	cd /opt/ucs-peers-register-frontend && \
	git stash && git checkout main && \
	git fetch && git merge origin/main -m $(MERGE_MSG) && \
	npm install && \
	npm run build && \
	echo "$(YELLOW)Peers Prod Frontend Deployment Completed.$(RESET)"