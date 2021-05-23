FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package.json

COPY .env .env

COPY ./src ./src

RUN npm install

# ARG PORT
ENV PORT=9090

CMD ["node", "./src/index.js"]

