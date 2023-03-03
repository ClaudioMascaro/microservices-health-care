doctor-service:
	@docker-compose up -d --no-deps --build doctor-service
.PHONY: doctor-service

database:
	@docker-compose up -d postgres
	@sleep 3
.PHONY: database

migrate:
	@npm run migrate
.PHONY: migrate

setup-db: database migrate
.PHONY: setup-db

purge-all:
	@docker ps -aq | xargs docker stop
	@docker ps -aq | xargs docker rm
	@docker images -q | xargs docker rmi
.PHONY: purge-all

test:
	@docker-compose run --rm doctor-service npm run test
.PHONY: test
