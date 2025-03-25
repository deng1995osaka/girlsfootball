#!/bin/bash

# 设置日志文件
LOG_FILE="/root/girlsfootball/deploy.log"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# 日志函数
log() {
    echo "[$TIMESTAMP] $1" | tee -a $LOG_FILE
}

# 错误处理
handle_error() {
    log "错误: $1"
    exit 1
}

# 开始部署
log "开始部署..."

# 检查目录是否存在
if [ ! -d "/root/girlsfootball" ]; then
    log "项目目录不存在，开始克隆..."
    cd /root
    git clone https://gitee.com/deng1995osaka/girlsfootball.git || handle_error "克隆仓库失败"
    cd girlsfootball
else
    log "项目目录已存在，开始更新..."
    cd /root/girlsfootball
    git pull origin main || handle_error "拉取代码失败"
fi

# 安装依赖
log "安装依赖..."
npm install || handle_error "安装依赖失败"

# 构建项目
log "构建项目..."
npm run build || handle_error "构建项目失败"

# 重启服务
log "重启服务..."
pm2 restart girlsfootball || handle_error "重启服务失败"

log "部署完成！" 