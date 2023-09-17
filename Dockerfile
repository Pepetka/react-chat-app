FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/chat-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:docker

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/chat-app

COPY --from=BUILD_IMAGE /app/chat-app/dist/ /app/chat-app/dist/
COPY --from=BUILD_IMAGE /app/chat-app/node_modules/ /app/chat-app/node_modules/

COPY package.json .
COPY vite.config.ts .

EXPOSE 8080
CMD ["npm", "run", "preview"]
