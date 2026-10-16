# Etapa 1: Construcción
FROM node:19-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Etapa 2: Imagen final
FROM node:19-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]