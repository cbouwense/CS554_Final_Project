# CS 554-A Final Project
## Team: The Mothballs
## Members: Christian Bouwense, Ben Iofel, Matt Rota, Taber McFarlin, Keyur Ved

A client/server for logging exercise.

To run the server backend:
```shell
mongod --dbpath /path/to/db &
cd backend
npm install
npm run seed
npm run worker
npm run dev
```

To run the client frontend
```shell
cd client
npm install
npm run start
```
