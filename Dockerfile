FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "start:combined"]
