FROM node:16.13.2-alpine

WORKDIR /user/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install

#bounle app souce
COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
