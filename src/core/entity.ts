export default abstract class Entity {
  toJson(options?: { deletePassword: boolean }): this {
    const obj: any = { ...this };
    if (options && options.deletePassword) delete obj.password;
    return obj;
  }
}
