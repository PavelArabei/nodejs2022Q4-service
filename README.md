# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Choose branch

```
git checkout part-three
```

## Installing NPM modules

```
npm install
```

## Running Docker

run docker on your computer then

```
 docker-compose up  
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test:auth
```

To watch that logs and errors writing to files open Docker Desktop => click to containers => choose my container =>
click on three dots on home-library-app => select View files => and watch in directory app/logs/

To check refresh token send on postman http://127.0.0.1:4000/auth/signup and data
{
"login":"balbla",
"password":"balbla"
} to register user;

then send on postman http://127.0.0.1:4000/auth/login  with the same data {
"login":"balbla",
"password":"balbla"
}

copy refreshToken

then send on postman http://127.0.0.1:4000/auth/refresh with Authorization Baerer "copied token" and this will return
you new pair of accessToken and refreshToken

to logout send on postman http://127.0.0.1:4000/auth/logout with Authorization Baerer "copied token"