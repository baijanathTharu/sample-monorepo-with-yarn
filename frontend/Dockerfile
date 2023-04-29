FROM node:18-alpine as DEV

WORKDIR /src

ENV NODE_ENV=development
ARG NEXT_PUBLIC_BACKEND_URL

COPY package.json ./
COPY yarn.lock ./
COPY next.config.js ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]





