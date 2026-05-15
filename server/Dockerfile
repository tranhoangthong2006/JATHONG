FROM node:20-alpine

# Cài đặt thư mục làm việc
WORKDIR /app

# Copy file cấu hình trước (để tận dụng Docker Cache)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --production

# Copy toàn bộ mã nguồn backend vào container
COPY . .

# Mở cổng 5000 cho backend
EXPOSE 5000

# Chạy server
CMD ["node", "server.js"]
