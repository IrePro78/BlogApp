#Base image
FROM node:16.13.0

#Install serve package
RUN npm i -g serve

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# install project dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the project
#RUN npm run build

# Expose a port
#EXPOSE 8000

# Executables
#CMD [ "serve", "-s", "dist" ]
CMD [ "npm", "run", "serve" ]