FROM node:lts-alpine

WORKDIR /usr/apps

COPY ./package.json .

RUN npm install

COPY . .

# RUN npm start 

CMD [ "npm", "run", "start" ]