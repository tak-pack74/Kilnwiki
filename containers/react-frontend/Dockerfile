FROM node:16.13.0

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./ ./
EXPOSE 3000

ENTRYPOINT ["npm", "run", "start", " HOST=0.0.0.0", "PORT=3000"]