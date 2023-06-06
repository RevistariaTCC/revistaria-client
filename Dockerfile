FROM node

WORKDIR /app

COPY . /app

RUN npm install --silent

EXPOSE 3000

CMD ["npm", "run", "dev"]