# 使用 Nginx 作为基础镜像
FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/nginx_optimized:20240221-1.20.1-2.3.0
# 复制 Jenkins 中构建好的 dist 目录到 Nginx 的根目录
COPY ./dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件到容器中
COPY ./nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]