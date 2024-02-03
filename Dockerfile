FROM node:16.17.0-bullseye-slim

# create the app group and user
RUN addgroup --system app && \
    adduser --system --group app

# change the working directory
WORKDIR /app

# setting production environment variables
ENV NODE_ENV=prod \
    PORT=3000

# install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# copy files to the app directory
COPY . .

# change to the app user
# switch to a non-root user, which is recommended.
USER app

# expose default port
EXPOSE 3000

CMD ["npm", "start"]