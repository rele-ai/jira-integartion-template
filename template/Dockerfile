FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

# ENV PORT
ENV PORT=9090

CMD ["node", "./src/index.js"]

