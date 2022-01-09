# Authentication system

Authentication system  is a typescript task for creating Authentication operation by using access-token and refresh-token for security purpose , there is 5 end-points register, login, view-profile, list-users.

# Task overview
A task is written in typescript by using the popular  Express  framework , MongoDb database and Redis 

# Task Architect
I tried as much as possible to follow Domain Driven Design  philosophy to learn something new . the tasks consist of 

```/src``` which include the source code of the task and this directory include 

   ```/components``` which include the components of the task , each component can isolated and be a system if we want to go from monlith to micro service

   ```/config``` which include the main configuration of the system , this config file load the configurations from .env file

   ```/core``` include the main class for the system which all components inherit from it , like the abstract entity class

   ```/error-handler``` include error-handler class which used to handle errors in the system 

   ```/infrastructure``` include the low level of the system like database connection

   ```/middlewares```  include the middelwares in the system

   ```/seeder``` include seeders for the system , this dir now include user-seed, we will use to get two users to test the task 

# Task scenario
this task can done in two way :
## by using session and redis or by use jwt and redis
i implement the second way - jwt and redis - every way has it's cons and props.

## my secnario implmentation 
first the user going to registeration endpoint to register after registeration success , then he going to login by using login endpoint and get refersh and access tokens at this time i loged the refersh token in the redis server and when he logout i delete it from redis , so redis like a black list to define the loged-in and loged-out users

## Installation

* install redis server on your os (https://redis.io/download).
* there is envexample don't forget to create you .env file 

## Usage

``` 
  npm i  # to install dependency
```
```
  npm run dev  # to run in dev mode
   or
  npm run build && npm run start #to build and run 
```
when the system go up you will get two users 
* first user with email `fatura@fatura.com` and password `fatura12345` this user has a role `admin` and can access protected routes like list-users endpoints
* second user with email `test@fatura.com` and password `test12345` this user has a role `user` , he will not able to access list-users endpoint , but can view his profile 

