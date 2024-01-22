# Use a imagem oficial do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm ci

# Copie o restante dos arquivos para o contêiner
COPY . .

# Exponha a porta necessária para o aplicativo Node.js
EXPOSE 3000

# Comando para iniciar o aplicativo Node.js
CMD ["npm", "start"]
