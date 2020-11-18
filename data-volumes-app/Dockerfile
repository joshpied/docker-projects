FROM node:14

WORKDIR /app

# copy to /app with .
COPY package.json .

RUN npm install

# first dot is entire folder where Dockerfile is, second dot is working directory
COPY . .

ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# anonymous volume, adding it in docker cl instead
# VOLUME ["/app/node_modules"]

CMD [ "npm", "start" ]