# Code Couch

Code Couch is a service that allows users (Coucheteers) to find projects that they are interested in and they can both help build and allow them to develop technically. Code Couch puts a lot of emphasis on participating in projects. Projects that you participate in appear on your profile page, and fellow Coucheteers can endorse you for skills you use. If you run into an issue, you can also ask a question on our forums where other Coucheteers can help you.

## Project Setup

Begin by cloning the project into whatever project directory you wish. We highly recommend setting up SSH so that you don't have to type in your username and password everytime you want to push changes, but HTTPS works too.

This project extensively uses docker to help prevent issues that can arrise from using different development environments.

To use docker, you will need to download and install [Docker for Windows](https://www.docker.com/docker-windows) if you are using Windows, or [Docker for Mac](https://www.docker.com/docker-mac) if you are using a Mac. If you are developing on Linux, as for help from someone else on the project.



### Frontend Setup

To setup the frontend, first, you will need to install [NodeJS](https://nodejs.org/en/download/current/). Once you download the NodeJS installer, run it and go through the wizard. Once Node is installed, you can go to the command line/terminal and run `node -v` to confirm that it has installed. We will not be relying directly on Node, but Node has a package manager, called npm, that we will use for our JavaScript dependencies.

The next step of setup is to install these dependencies. Inside of the command line/terminal, move into the `frontend` directory.

```
cd <project directory>/frontend
```
Once you are there, run

```
npm install
```

This will install all of the dependencies listed inside of the `package.json`.

Once all of the dependencies have been installed, you can run the frontend. To do so, inside of the `frontend` directory, run

```
docker-compose build
```

This will build the docker container. To run the docker container that you just built, run

```
docker-compose up
```

This will bring up the container, and after it has started, it will start up the NodeJS local development server that React uses. Once it is up, you should be redirected to your browser, to a new tab going to [localhost:3000](localhost:3000). Note, any changes you make to the frontend code will not show up until you rebuild the frontend container. You can get around this by running the frontend outside of the docker container. To do this, run

```
npm start
```

### Backend Setup

In order to use the backend, you are required to have NodeJS. Instructions to set that up are in the frontend section.

Once you have NodeJS installed, move into the `backend` directory.

```
cd <project directory>/backend
```

Once you are in the backend directory, run

```
npm install
```

This will install the dependencies listed in the `package.json`.

After the dependencies have been installed, you can run the backend. To do this, first build the docker container by running

```
docker-compose build
```

Once you have built the backend, you can stand the backend container up with

```
docker-compose up
```

This will bring up the backend docker container. You can confirm that it is running by going to [localhost:3001](localhost:3001) in your browser. There, you should see a test message. Note, any changes made will not appear unless you rebuild the backend. You can get around this by bypassing the docker container during local development. To do this, run

```
npm start
```

This will run the backend outside of the docker container.

#### Database Setup

In order to run the database, you need to move into the `db` directory:
```
cd <project directory>/db
```

Next, run:
```
docker-compose up
```

For the database, since we are pulling the MySQL image from Docker, we only need to bring the container online. Once it has come online, it will be available at `localhost:3002` or `127.0.0.1:3002`.

If you want to connect to the database manually, you will first need to have a MySQL client of some kind (highly recommend using [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)). To connect to the development database, you will connect to `127.0.0.1` and the port is `3002`. The only user it has is `root`, and the password is located in `<project directory>/backend/docker-compose.yml`. If the backend container is running, you should then be able to connect to the database.

## Testing

### Frontend Testing - Mocha

The frontend uses [Mocha](https://mochajs.org/) for running tests, [Chai](http://chaijs.com/) for assertions, [Sinon](http://sinonjs.org/) for mocking, and [Enzyme](http://airbnb.io/enzyme/docs/api/) for testing React components.

To run the test suite, you can run `npm run test` from `<project directory>/frontend`. You will then see the reporter go through each test, reporting successful tests, failures, and any tests that did not run along with a code coverage report.

### Backend Testing - JUnit

The backend uses [Mocha](https://mochajs.org/) for running tests, [Chai](http://chaijs.com/) for assertions, [Sinon](http://sinonjs.org/) for mocking, and [Supertest](https://github.com/visionmedia/supertest) for testing endpoints.

To run the test suite, you can run `npm run test` from `<project directory>/backend`. You will then see the reporter go through each test, reporting successful tests, failures, and any tests that did not run along with a code coverage report.
