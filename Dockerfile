# Configuration for Docker container using Node.js, TypeScript, and commands required.
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY tsconfig*.json ./
COPY . .
RUN tsc
EXPOSE 4000
CMD ["node", "dist/index.js"]
