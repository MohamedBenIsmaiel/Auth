export default class Enum {
  static ADMIN = 'admin';
  static USER = 'user';

  static values(): string[] {
    return Object.values(this);
  }
}
