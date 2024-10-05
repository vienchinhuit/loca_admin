
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-audit

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "start"]
