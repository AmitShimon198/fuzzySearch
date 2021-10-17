## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a sample app that simulates blood test results with a fuzzy search integrated.

## Technologies
Project is created with:
### Client-App: 
* React version: 17.0.2
* TypeScript 4.4.4
* BootStrap version 5.1.3
* fuse.js version 6.4.6 
### Server-App:
* nodejs version 14.17.3 - **make sure you have nodejs installed on your machine** 
  if not you can download it from here: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* express version 4.17.1

## Setup

### Client-App:
**To get started, go in to the root client folder, open CMD type npm install when npm finish type npm start.**
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
**inside the main (server) folder you will find .env file there you can configurate the server app.**

### Server-App:
**To get started, go into the root server folder, open CMD type npm install when npm finish type npm run start-dev.**
**inside the main (client) folder, you will find the .env file there you can configure the client app.**

### DataSet
**inside the main folder (where you can find both client and server folders you will find the bloodTestConfig.json file, put the file in your preferred folder and link the location, inside the server folder, you will discover .env file with property name BLOOD_TEST_CONFIG_LOCATION edit its value and you good to go.** 

```
$ cd client 
$ npm install
$ npm start
$ cd server
$ npm install
$ npm start-dev

```
