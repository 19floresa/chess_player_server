FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3025
CMD ["npm", "run", "dev"]