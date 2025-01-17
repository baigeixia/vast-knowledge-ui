# 第一阶段：构建前端应用
FROM node:16-alpine as build

WORKDIR /app
COPY . .
RUN yarn 
RUN yarn build

# 第二阶段：运行前端应用
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
