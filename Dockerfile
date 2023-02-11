FROM node:16.19.0-bullseye-slim
RUN npm install -g npm

WORKDIR /usr/apps


COPY ./package.json .

RUN npm install

COPY . .

# RUN npm start 

CMD [ "npm", "run", "start" ]