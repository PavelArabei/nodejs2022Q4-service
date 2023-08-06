# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Choose branch

```
git checkout part-two
```

## Installing NPM modules

```
npm install
```

## Running Docker

run docker on your computer

```
 docker-compose up  
```

if you want to download images

```
docker pull pavel7788/home-library-postgres:latest 

docker pull pavel7788/home-library-app:latest
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
