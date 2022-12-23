FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN chown -R node /app/node_modules

COPY . .

EXPOSE 8080

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]