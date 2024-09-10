FROM node:20-slim

WORKDIR /nodevoto
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD npm run start
