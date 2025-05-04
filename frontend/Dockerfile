FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy all files
COPY . .

# Set environment variables if needed
ENV NODE_ENV=production

# Expose port
EXPOSE 5173

# Start the application in development mode
CMD ["yarn", "dev", "--host", "0.0.0.0"]