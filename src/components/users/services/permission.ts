import { userEnums } from '../entities';
//in the future this file will include the permission relate to this module - user -
export default class Permission {
  static isAdmin(role: string): boolean {
    return role == userEnums.ADMIN;
  }
}
