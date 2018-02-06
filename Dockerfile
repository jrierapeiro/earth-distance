FROM node:8.9.4-slim
WORKDIR /usr/src/app
ADD . /usr/src/app
CMD npm start
