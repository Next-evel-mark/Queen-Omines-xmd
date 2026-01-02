# Use official Node.js image
FROM node:20-buster

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy app source
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose app port
EXPOSE 8000

# Run the app
CMD ["npm", "start"]
