# build stage
FROM node:14.16.1 as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
COPY . /app/
RUN quasar build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/vue-quasar-manage/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]