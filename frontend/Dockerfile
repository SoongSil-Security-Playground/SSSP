FROM node:18

WORKDIR /app

# do not caching package.json
COPY ./package*.json ./
RUN npm install

# now apply changes to the code
COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]