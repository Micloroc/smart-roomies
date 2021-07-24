FROM node:lts as dependencies

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm ci

#----------------------
FROM node:lts

USER node
WORKDIR /home/node/app
COPY --from=dependencies /home/node/app/package*.json /home/node/app/