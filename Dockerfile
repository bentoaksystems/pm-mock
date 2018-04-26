
# docker file for mock

FROM node:carbon

# Create app directory
WORKDIR usr/src/app

ENV CALL_BACK_URL localhost


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 81

CMD [ "npm", "start" ]
