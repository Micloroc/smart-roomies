FROM node as dependencies

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm ci
RUN npm run build

#----------------------
FROM node

USER node
WORKDIR /home/node/app
COPY --from=dependencies /home/node/app/dist /home/node/app
COPY --from=dependencies /home/node/app/package*.json /home/node/app/
CMD ['npm', 'run', 'start:dev']