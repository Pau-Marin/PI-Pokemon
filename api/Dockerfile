# Minimum node version
FROM node:16-alpine

# Working directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm ci --only=production

# Own code
COPY . .

# Port
EXPOSE 3001

# Command to start server
CMD ["node", "index.js"]