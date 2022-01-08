import bcrypt from 'bcrypt';
import { saltRounds } from '../config';

export default class Password {
  private static async generateSalt(): Promise<string> {
    return bcrypt.genSalt(saltRounds);
  }

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, await Password.generateSalt());
  }

  static compare(
    plainPassword: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashPassword);
  }
}
