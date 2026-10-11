FROM node:24

ENV NODE_ENV=production


WORKDIR /app

COPY package*.json ./


RUN npm ci


COPY . .


EXPOSE 10000

CMD ["node", "src/server.js"]
