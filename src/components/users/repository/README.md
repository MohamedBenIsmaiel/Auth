# Repository Director

Repository is adapter between MongoDb and Use-case , the domain doesn't know about technology like database so repository exist to give us apis to manipulate the database from it, in the future we can change Our database from Mongo to Mysql without touch and modify our business layer 

## Repository consist of 
* User model 
* UsersDb 
UsersDb is a class which contains methods that manipulate MongoDb directly

```
users-db.ts file

export default function buildUsersDb({ userModel }: IBuildUsersDb) {
  return class UsersDb {
```
buildUserDb is a builder function that task userModel as dependency injection and return UsersDb class 