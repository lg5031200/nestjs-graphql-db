# FROM node:12.13-alpine As development

# Create app directory
# WORKDIR /app

# # Bundle app source
# COPY . .

# RUN yarn

# Main server
# EXPOSE 3001

# Default command for executing container
# CMD [ "yarn", "start:dev" ]

# Build Stage 1
# This build created a staging docker image 
#
FROM node:12.13-alpine AS appbuild
WORKDIR /app
COPY . .
RUN yarn

# Build Stage 2
# This build takes the production build from staging build
#
FROM node:12.13-alpine AS development
WORKDIR /app
COPY --from=appbuild /app .