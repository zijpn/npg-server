FROM node:carbon

LABEL name npg-server
LABEL version 0.1.0
LABEL description "Network PlayGround Server"

# app directory
WORKDIR /opt/npg-server

# install dependencies
COPY package.json .
RUN npm install --production

# add app
ADD dist dist
ADD public public

VOLUME /var/run/docker.sock

EXPOSE 8080
CMD ["npm", "start"]
