database:
	@docker-compose up -d postgres dynamodb
	@sleep 3
.PHONY: database

migrate:
	@npm run migrate
.PHONY: migrate

setup-db: database migrate
.PHONY: setup-db

run-services:
	@docker-compose up -d --build appointment-service doctor-service auth-service api-gateway
.PHONY: run-services

prepare: setup-db run-services

purge-all:
	@docker ps -aq | xargs docker stop
	@docker ps -aq | xargs docker rm
	@docker images -q | xargs docker rmi
.PHONY: purge-all
