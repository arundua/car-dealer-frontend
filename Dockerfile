# Dockerfile for React Frontend

# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to run the build
RUN npm install -g serve

# Set environment variables
ENV PORT 3000

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the command to serve the React app
CMD ["serve", "-s", "build"]
