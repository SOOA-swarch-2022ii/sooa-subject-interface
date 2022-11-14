FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
CMD ["npm", "i", "--force", "soap@'>=0.30.0'"]
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
