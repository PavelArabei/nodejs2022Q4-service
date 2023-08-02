FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

ENV PORT 4000

CMD ["npm", "run", "start:dev"]