# Version 20240804 Added other deploy paths

deployTestBackend:
	echo "$(tput setaf 2)Deploying Test Backend...$(tput sgr0)"
	cd /opt/ucs-icchw-gateway-backend && \
	git stash && git checkout dev && \
	git fetch && \
	git merge origin/dev -m "Automerged by Makefile" && \
	npm install --silent && \
	pm2 restart gateway-backend && \
	echo "$(tput setaf 3)Test Backend Deployment Completed.$(tput sgr0)" && cd -

deployProdBackend:
	echo "$(tput setaf 2)Deploying Prod Backend...$(tput sgr0)"
	cd /opt/ucs-icchw-gateway-backend && \
	git stash && git checkout main && \
	git fetch && \
	git merge origin/main -m "Automerged by Makefile" && \
	npm install --silent && \
	pm2 restart gateway-backend && \
	echo "$(tput setaf 3)Prod Backend Deployment Completed.$(tput sgr0)" && cd -

deployTestFrontend:
	echo "$(tput setaf 2)Deploying Test Frontend...$(tput sgr0)"
	cd /opt/ucs-icchw-gateway-frontend && \
	git stash && git checkout dev && \
	git fetch && \
	git merge origin/dev -m "Automerged by Makefile" && \
	npm install --silent && \
	npm run build --silent && \
	echo "$(tput setaf 3)Test Frontend Deployment Completed.$(tput sgr0)" && cd -

deployProdFrontend:
	echo "$(tput setaf 2)Deploying Prod Frontend...$(tput sgr0)"
	cd /opt/ucs-icchw-gateway-frontend && \
	git stash && git checkout main && \
	git fetch && \
	git merge origin/main -m "Automerged by Makefile" && \
	npm install --silent && \
	npm run build --silent && \
	echo "$(tput setaf 3)Prod Frontend Deployment Completed.$(tput sgr0)" && cd -

deployTestWebhooks:
	echo "$(tput setaf 2)Deploying Test Webhooks...$(tput sgr0)"
	cd /opt/ucs-icchw-gateway-webhooks && \
	git stash && git checkout dev && \
	git fetch && \
	git merge origin/dev -m "Automerged by Makefile" && \
	npm install --silent && \
	pm2 restart ucs-gateway-webhooks && \
	echo "$(tput setaf 3)Test Webhooks Deployment Completed.$(tput sgr0)" && cd -

deployProdWebhooks:
	echo "$(tput setaf 2)Deploying Prod Webhooks...$(tput sgr0)"
	cd /opt/ucs-icchw-gateway-webhooks && \
	git stash && git checkout main && \
	git fetch && \
	git merge origin/main -m "Automerged by Makefile" && \
	npm install --silent && \
	pm2 restart ucs-gateway-webhooks && \
	echo "$(tput setaf 3)Prod Webhooks Deployment Completed.$(tput sgr0)" && cd -


# UCS Peers Registration Webhooks
deployPeersTestBackend:
	echo "$(tput setaf 2)Deploying Peers Test Backend...$(tput sgr0)"
	cd /opt/ucs-peers-register-backend && \
	git stash && git checkout dev && \
	git fetch && \
	git merge origin/dev -m "Automerged by Makefile" && \
	npm install --silent && \
	npm run build --silent && \
	pm2 restart ucs-peers-backend && \
	echo "$(tput setaf 3)Peers Test Backend Deployment Completed.$(tput sgr0)" && cd -

deployPeersProdBackend:
	echo "$(tput setaf 2)Deploying Peers Prod Backend...$(tput sgr0)"
	cd /opt/ucs-peers-register-backend && \
	git stash && git checkout main && \
	git fetch && \
	git merge origin/main -m "Automerged by Makefile" && \
	npm install --silent && \
	npm run build --silent && \
	pm2 restart ucs-peers-backend && \
	echo "$(tput setaf 3)Peers Prod Backend Deployment Completed.$(tput sgr0)" && cd -

deployPeersTestFrontend:
	echo "$(tput setaf 2)Deploying Peers Test Frontend...$(tput sgr0)"
	cd /opt/ucs-peers-register-frontend && \
	git stash && git checkout dev && \
	git fetch && \
	git merge origin/dev -m "Automerged by Makefile" && \
	npm install --silent && \
	npm run build && \
	echo "$(tput setaf 3)Peers Test Frontend Deployment Completed.$(tput sgr0)" && cd -

deployPeersProdFrontend:
	echo "$(tput setaf 2)Deploying Peers Prod Frontend...$(tput sgr0)"
	cd /opt/ucs-peers-register-frontend && \
	git stash && git checkout main && \
	git fetch && \
	git merge origin/main -m "Automerged by Makefile" && \
	npm install --silent && \
	npm run build && \
	echo "$(tput setaf 3)Peers Prod Frontend Deployment Completed.$(tput sgr0)" && cd -

	