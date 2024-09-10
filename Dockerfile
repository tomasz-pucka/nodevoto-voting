FROM node:20-slim

# test

WORKDIR /nodevoto
COPY package.json package-lock.json ./
RUN npm install
WORKDIR /nodevoto/services/nodevoto-web/webapp
COPY services/nodevoto-web/webapp/package.json services/nodevoto-web/webapp/package-lock.json .
RUN npm install
WORKDIR /nodevoto
COPY . .
CMD npm run $SVC_NAME
