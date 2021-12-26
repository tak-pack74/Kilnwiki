FROM node:16.13.0 as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./ ./

ENV REACT_APP_CONFIG_NAME=docker-container

RUN npm run build



FROM nginx:1.21.4
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf