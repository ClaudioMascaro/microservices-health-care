FROM node:18 as api-gateway

WORKDIR /code

COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm ci

COPY config /code/config
COPY index.js /code
COPY src /code/src

CMD [ "bin/sh", "entrypoint.sh" ]
