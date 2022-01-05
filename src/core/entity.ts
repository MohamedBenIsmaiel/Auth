export default abstract class Entity {
  toJson(): this {
    const obj = { ...this };
    return obj;
  }
}
