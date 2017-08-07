# wechat-api
# MAINTAINER mrsix
# VERSION  1.0.0

FROM node:latest

RUN mkdir -p /home/wechat/api
WORKDIR /home/wechat/api

COPY . /home/wechat/api
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
