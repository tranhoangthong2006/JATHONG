# Bước 1: Build source code React
FROM node:20-alpine AS build

WORKDIR /app

# Copy và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code và build ra thư mục dist
COPY . .
RUN npm run build

# Bước 2: Dùng serve để chạy file tĩnh (Hỗ trợ React Router mượt mà)
FROM node:20-alpine

WORKDIR /app

# Cài đặt công cụ serve toàn cục
RUN npm install -g serve

# Copy thư mục dist từ bước 1 sang
COPY --from=build /app/dist ./dist

# Mở cổng 3000
EXPOSE 3000

# Chạy serve thư mục dist ở cổng 3000, flag -s hỗ trợ SPA/React Router
CMD ["serve", "-s", "dist", "-l", "3000"]
