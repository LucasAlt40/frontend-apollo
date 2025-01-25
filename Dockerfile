# Use uma imagem oficial do Node.js como base
FROM node:20-alpine AS build

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de dependências para o contêiner
COPY package.json yarn.lock ./

# Instale as dependências
RUN npm install

# Copie o restante do projeto
COPY . .

# Faça o build da aplicação
RUN npm run build

# Use uma imagem leve do Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copie os arquivos buildados para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta padrão do Nginx
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
