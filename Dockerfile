# Nodejs Image
FROM node:18

# workspace from docker
WORKDIR /app

# Files to container
COPY package*.json ./

# Instale as dependências
RUN npm ci

# Files to docker container after installation from lock.json
COPY . .

# Exponha a porta necessária para o aplicativo Node.js
EXPOSE 3000

# Comando para iniciar o aplicativo Node.js
CMD ["npm", "dev"]
