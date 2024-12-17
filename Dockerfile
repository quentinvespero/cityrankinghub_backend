# Use Node.js image
# here it will use the version 22 and all its potential minor updates
FROM node:22

# Set working directory
# the folder where will be stored the data of the app in the docker container
WORKDIR /app

# Copy package files
# copy the package.json and package-lock.json files in the WORKDIR
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
# copy the content of the current folder into the current destination folder, which is app 
COPY . .

# Build TypeScript
# will build the code, aka transpile typescript to javascript so node can read it
# RUN npm run build

# Expose port
EXPOSE 5001

# Run the app
# run the compiled javascript code
# CMD ["node", "dist/server.js"]
CMD ["npm", "run", "dev"]