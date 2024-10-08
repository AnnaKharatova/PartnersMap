
FROM node:20.10.0-alpine as build 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

