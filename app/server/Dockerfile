FROM node:latest
RUN mkdir app
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 5000
CMD [ "yarn", "start" ]