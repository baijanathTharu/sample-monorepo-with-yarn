FROM node:18-alpine as DEV

WORKDIR /src

ENV NODE_ENV=development


COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY prisma prisma

RUN yarn install

# Generate prisma client
RUN yarn g

COPY . .

EXPOSE 8080

CMD [ "yarn", "dev" ]





