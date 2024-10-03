# Sử dụng Node.js làm base image
FROM node:18-alpine

# Set thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install --no-audit

# Copy toàn bộ mã nguồn ứng dụng vào container
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Expose port 3000 cho ứng dụng
EXPOSE 3005

# Lệnh để chạy ứng dụng Next.js
CMD ["npm", "start"]
