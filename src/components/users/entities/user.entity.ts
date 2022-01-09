/* eslint-disable @typescript-eslint/ban-types */
import { IUser, IBuildUser } from '../type';
import Entity from '../../../core';
import validate from './validator/index';

export default function buildUser({ UserAddress }: IBuildUser) {
  return class User extends Entity {
    private id?: string;
    private name?: string;
    private email: string;
    private address?: typeof UserAddress | {};
    private mobileNumber?: string;
    private role?: string;
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
    }

    async validateRegister(): Promise<any> {
      const obj = this.toJson();
      delete obj.id;
      return validate.validateRegister(obj);
    }

    async validateLogin(): Promise<any> {
      return validate.validateLogin({
        email: this.email,
        password: this.password
      });
    }

    setPassword(password: string): void {
      this.password = password;
    }

    getPassword(): string {
      return this.password;
    }

    getEmail(): string {
      return this.email;
    }

    getMobileNumber(): string {
      return this.mobileNumber as string;
    }

    getId(): string {
      return this.id as string;
    }

    getRole(): string {
      return this.role as string;
    }
  };
}
