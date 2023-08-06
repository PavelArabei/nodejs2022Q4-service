FROM node:18.17.0-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

ENV PORT 4000

CMD ["npm", "run", "start:combined"]
#CMD ["sh", "-c", "sleep 10 && npm run db:migrate && npm run start:dev"]