ARG A_VARIABLE

FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm ci
RUN npm install pm2 -g

CMD ["pm2-runtime", "process.yml"]

