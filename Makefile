.PHONY: docker

backend=php
frontend=node

# Docker操作
build:
	docker compose build --no-cache

ps:
	docker ps

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down up

# -----------------------
# Laravel
# -----------------------

# 任意の artisanコマンド
artisan:
	docker compose exec $(backend) php artisan $(filter-out $@,$(MAKECMDGOALS))

controller:
	docker compose exec $(backend) php artisan make:Controller $(filter-out $@,$(MAKECMDGOALS))Controller

model:
	docker compose exec $(backend) php artisan make:model $(filter-out $@,$(MAKECMDGOALS)) --migration

request:
	docker compose exec $(backend) php artisan make:request $(filter-out $@,$(MAKECMDGOALS))Request

# マイグレーション
migrate:
	docker compose exec $(backend) php /var/www/html/artisan migrate

migrate-refresh:
	docker compose exec $(backend) php /var/www/html/artisan migrate:refresh

# -----------------------
# Node.js
# -----------------------

npm:
	docker compose exec $(frontend) npm install $(filter-out $@,$(MAKECMDGOALS))

# -----------------------
# ログ
# -----------------------
logs:
	docker compose logs -f
