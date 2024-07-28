FROM node:20-alpine as base

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install


FROM base as dev

# Copy the rest of the files
COPY . .

ENTRYPOINT ["npm", "run", "dev"]


FROM dev as test

COPY . .

ENTRYPOINT ["npm", "run", "test"]
