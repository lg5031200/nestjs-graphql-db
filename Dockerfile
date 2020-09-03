FROM node:12.13.0 As development

# Create app directory
# WORKDIR /usr/src/app
WORKDIR /app

# Install app dependencies
# COPY package.json yarn.lock ./

# Bundle app source
COPY . .

RUN yarn

# Main server
# EXPOSE 3001

# Default command for executing container
# CMD [ "yarn", "start:dev" ]