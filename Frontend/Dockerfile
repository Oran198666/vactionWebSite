# Start from Alpine Linux with Node.js 24
FROM node:24-alpine

# All following commands run inside /app
WORKDIR /app

# Copy only package.json and package-lock.json first (caches the install step)
COPY package*.json /app/

# Install all dependencies
RUN npm install

# Copy the rest of the frontend code (including .env with VITE_API_URL)
COPY . /app/

# Vite dev server port
EXPOSE 5173

# Start the Vite dev server(check vite.config)
ENTRYPOINT [ "npm", "run", "dev" ]