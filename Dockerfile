FROM node:12.13.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

# Main server
EXPOSE 3001

# Default command for executing container
CMD [ "yarn", "start:dev" ]