FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install
RUN npm install pm2 -g

CMD ["pm2-runtime", "process.yml"]

