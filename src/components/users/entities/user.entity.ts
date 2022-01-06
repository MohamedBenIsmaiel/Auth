/* eslint-disable @typescript-eslint/ban-types */
import { IUser, IBuildUser } from '../type';
import Entity from '../../../core';

export default function buildUser({ userEnums, UserAddress }: IBuildUser) {
  return class User extends Entity {
    private id?: string;
    private name: string;
    private email: string;
    private address?: typeof UserAddress | {};
    private mobileNumber: string;
    private role: string;
    private hobbies?: string[];
    private password: string;

    constructor(userPayload: IUser) {
      super();

      this.id = userPayload.id;
      this.name = userPayload.name;
      this.email = userPayload.email;
      this.address = new UserAddress(userPayload.address || {}).toJson();
      this.mobileNumber = userPayload.mobileNumber;
      this.role = userPayload.role;
      this.hobbies = userPayload.hobbies;
      this.password = userPayload.password;

      this.validate();
    }

    validate(){};
  };
}
