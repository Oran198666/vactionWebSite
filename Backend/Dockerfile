# starts Linux Alpine containing Node.js 24
FROM node:24-alpine

# All following commands run inside /app in the container
WORKDIR /app

# Copy only package.json and package-lock.json files to /app inside the image:
COPY package*.json /app/

# Run npm install inside the image to build node_modules
RUN npm install

# Copy the rest of the backend source code
COPY . /app

# Compile TypeScript (src/*.ts) into JavaScript (dist/*.js)
RUN npm run build

# Document that the app listens on port 4000
EXPOSE 4000

# Start the server: runs "node dist/app.js" (the "start" script)
ENTRYPOINT [ "npm", "start" ]