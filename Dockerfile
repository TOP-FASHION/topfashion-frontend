#
# Build 1.
# This state produces an intermediate Docker image containing the compiled JavaScript code.
#
FROM node:12.14-alpine as builder

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#
# Build prod 2.
# This stage pulls the compiled JavaScript code from the stage 1 intermediate image.
# This stage builds the final Docker image that we'll use in production.
#
FROM node:12.14-alpine

WORKDIR /app
COPY --from=0 /src/_build_prod/ ./
RUN npm install --only=production

EXPOSE 8000

CMD ["npm", "run", "start"]
