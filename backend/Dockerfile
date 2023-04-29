FROM node:18-alpine as DEV

WORKDIR /src

ENV NODE_ENV=development


COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "dev" ]





