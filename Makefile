database:
	@docker-compose up -d postgres
	@sleep 3
.PHONY: database

migrate:
	@npm run migrate
.PHONY: migrate

setup-db: database migrate
.PHONY: setup-db

api-gateway:
	@docker-compose up -d --build api-gateway

doctor-service:
	@docker-compose up -d --build doctor-service

appointment-service:
	@docker-compose up -d --build appointment-service

prepare: setup-db doctor-service appointment-service api-gateway

purge-all:
	@docker ps -aq | xargs docker stop
	@docker ps -aq | xargs docker rm
	@docker images -q | xargs docker rmi
.PHONY: purge-all
