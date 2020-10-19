# GSITest

This git repository consists of two folders. 

The `laratest` folder contains the laravel and mysql docker-compose config file and the relevant code.

#### Prerequisite for Laravel & MySQL
Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).

1. `git clone`
2. `create a .env file copy content from .env.docker and do not make any change`
3. `cd laratest`

Run the following command in terminal for initially docker build
```
docker-compose up -d
```

when docker will finish building the containers, access the "laravel-app" container using following command

`docker exec -it laravel_app sh`

now you will be inside container

run following commands
1. `composer install && composer update`
2. `php artisan cron:refresh-database`
3. `php artisan key:gen`

Open the following URL in the browser:

`http://localhost:8100`

API can be tested by importing the file `Laratest.postman_collection.json` into the Postman.

The `reacttest` folder contains the Reactjs part of the code.
#### Prerequisite for Reactjs are Node & npm
1. Install `node` version 10+ & npm version 6+
2. cd `reacttest`
3. `npm install` to install the React packages locally
4. `npm start` to run the start the local server.

Open the following URL in the browser:

`http://localhost:3000`
