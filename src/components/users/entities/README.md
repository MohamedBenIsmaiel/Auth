# Entity Directory

Entity directory contain the base of the business for our task.

###  Entity consist of
based on DDD the entity contain the main business and that's represented in 
* Entity like User
* Value Object - doesn't has identifer - like address 
* Enums that's used in the business in our case the role is Enum that's admin or user
* validator dir which includes validators,  i use it in entity with adapter pattern, entity shouldn't depend on any thing becuase it's the base of our app

* ```user.entity.ts``` describe the user entity , contain fields and method
```
user.entity.ts file 

export default function buildUser({ UserAddress }: IBuildUser) {
  return class User extends Entity {
```
buildUser is a builder function task `UserAddress` -value object- as dependency injection and then return a class User which extends from Entity , Entity is an abstract class which contain the generic method that all entity can use

```
user.entity.ts file

constructor(userPayload: IUser) {
      super();
```
User constructor take userPayload as param and it's type is IUser , IUser is an interface.

```
type.d.ts file

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  address?: IAddress;
  mobileNumber?: string;
```

* index.ts is the start point for the entity , we import all entity elements to it and export them from it 

```
index.ts file

import buildUser from './user.entity';
import buildAddress from './user-address';
import userEnums from './enums';

const UserAddress = buildAddress();
const User = buildUser({ UserAddress });

export { User, UserAddress, userEnums };
```

* user-address is a value Object , value object " differ from entities by lacking the concept of identity. We do not care who they are but rather what they are "
 [reference](https://medium.com/swlh/value-objects-to-the-rescue-28c563ad97c6#:~:text=In%20DDD%2C%20value%20objects%20differ,attributes%20and%20should%20be%20immutable.)

```
user-address.ts file

export default function buildAddress() {
  return class UserAddress extends Entity {
    private country?: string;
```
* enums , i make enums in class to be more dynamic i can add methods to , maybe in the future i can create abstract class for all enums to put the shareable method in it

```
export default class Enum {
  static ADMIN = 'admin';
  static USER = 'user';

  static values(): string[] {
    return Object.values(this);
  }
}
```

