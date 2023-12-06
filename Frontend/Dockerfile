# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
