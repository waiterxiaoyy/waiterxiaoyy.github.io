#!/bin/bash

# 本地编译后的文件路径
LOCAL_BUILD_DIR="./dist"

# 检查 dist 目录是否存在
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
  echo "Error: Build directory $LOCAL_BUILD_DIR does not exist."
  exit 1
fi

# 远程服务器信息
REMOTE_USER="root"
REMOTE_HOST="43.138.216.51"
REMOTE_DIR="/root/nginx/html"

# 使用rsync将本地编译后的文件同步到远程服务器
rsync -avz --delete $LOCAL_BUILD_DIR/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# 输出完成信息
echo "Files have been successfully uploaded to the server."
