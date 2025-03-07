# 第一阶段：构建前端应用
FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/node:20.16  as build

WORKDIR /app

# 复制 package.json 和 yarn.lock 先行安装依赖，避免不必要的重新安装
COPY package.json yarn.lock ./
# 使用 --frozen-lockfile 保证依赖版本一致
RUN yarn install --frozen-lockfile  

# 然后复制其他代码并构建项目
COPY . .
RUN yarn buil

# 第二阶段：运行前端应用
FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/nginx_optimized

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
