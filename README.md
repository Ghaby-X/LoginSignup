# MERN STACK LOGIN/SIGNUP APPLICATION
This is a full-stack web application implementing user authentication with login and signup functionality. It uses the MERN stack – MongoDB, Express.js, React, and Node.js.
Authentication and authorization is done with passportjs and it uses, the Local strategy and sessions.

## Features
User Authentication: Users can sign up and log in securely.

Password Hashing: Passwords are hashed before storage for security.

MongoDB Database: User data is stored in a MongoDB database.

Protected Routes: User need to be authenticated before the dashboard page can be accessed

Express.js Server: Node.js server using Express.js for handling API requests.

React Frontend: User-friendly UI built with React for the frontend.


## WorkFlow
In this particular project, session data is stored in server memory for development purposes


![image](https://github.com/Ghaby-X/LoginSignup/assets/105595126/0c3917aa-06f8-475c-b5f5-15995a863f3a)


## Pre Requisites
1. Nodejs and npm

2. Mongodb

3. React

## Getting Started
1. Clone the repository

```
git clone https://github.com/Ghaby-X/LoginSignup.git
cd LoginSignup
```

2. create an env in both client and server directory. format is shown in a sample.env file

3. Install dependencies in both directory

for client;
```
cd client
npm install
```
for server;
```
cd server
npm install
```

4. Run both server and client

for client (while in the client directory);
```
npm run dev
```
for server(while in the server directory);
```
npm run dev
```


## Video of working app
