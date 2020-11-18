# SETTING UP IMAGE -> container can be run based on this image

# use node image from dockerhub
FROM node:12
# tells docker theat subsequenct commands will be within this folder
WORKDIR /app
# pick up package json into /app folder, ensures npm i layer comes before copying app layer
COPY package.json /app
# install project
RUN npm install
# first dot says use all folders/files in current dir, second item says output in current working directory (which will be /app)
COPY . /app
# expose local port to system to run container
EXPOSE 80
# start the server when the container is launched
CMD ["node", "server.js"]
