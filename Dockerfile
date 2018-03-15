FROM node:carbon

LABEL name npg-server
LABEL version 0.1.0
LABEL description "Network PlayGround"

# app directory
WORKDIR /opt/npg-server

# add app, fontend and backend
ADD dist dist
ADD public public
ADD backend backend

# install dependencies
COPY package.json .
RUN npm install --production \ 
 && npm install -g machine-share

# install docker machine and import credentials 
RUN curl -L --silent https://github.com/docker/machine/releases/download/v0.14.0/docker-machine-Linux-x86_64 > /tmp/docker-machine \
 && install /tmp/docker-machine /usr/local/bin/docker-machine \
 && rm /tmp/docker-machine \
 && cd backend \
 && machine-import npg-01.zip \
 && machine-import npg-02.zip \
 && find ~/.docker -name npg | xargs chmod 600

ENV SHELL /bin/bash
EXPOSE 8080
CMD ["npm", "start"]
