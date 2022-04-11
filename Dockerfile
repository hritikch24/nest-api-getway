FROM node:12.14.1-alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . ./
RUN npm run build
CMD npm run start
