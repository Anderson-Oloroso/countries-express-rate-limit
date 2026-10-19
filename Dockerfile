FROM node:lts-alpine

# Crear directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo nodemon si está en devDependencies)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de la aplicación (ajusta según tu app.js, por ejemplo 3000)
EXPOSE 3000

# Comando por defecto para iniciar la aplicación con nodemon
CMD ["npm", "run", "dev"]