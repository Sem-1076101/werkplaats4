# Start from a base Node.js image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Fix incompatible dependencies
RUN npx expo install --fix

# Copy the rest of the source code from your host to your image filesystem.
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application when the container launches
CMD ["npx", "expo", "start", "--web"]
