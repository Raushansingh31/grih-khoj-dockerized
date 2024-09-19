# Use the official Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .

# Install dependencies (both root and client)
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the frontend (client)
RUN npm install --prefix client && npm run build --prefix client

# Expose the ports (backend and frontend)
EXPOSE 5000
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]
