# BASE stage
FROM node:18-alpine as BASE

WORKDIR /src

COPY package.json ./
COPY yarn.lock ./
COPY next.config.js ./

EXPOSE 8080

# DEV stage
FROM BASE as DEV
ENV NODE_ENV=development

RUN yarn install

COPY . .

CMD [ "yarn", 'dev' ]

