#!/bin/bash

echo "开始部署..."

# 进入项目目录
cd /root/girlsfootball

# 拉取最新代码
echo "拉取最新代码..."
git pull origin main

# 安装依赖
echo "安装依赖..."
npm install

# 构建项目
echo "构建项目..."
npm run build

# 重启服务
echo "重启服务..."
pm2 restart girlsfootball

echo "部署完成！" 