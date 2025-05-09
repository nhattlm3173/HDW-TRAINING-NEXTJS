type ObjectType = Record<string, unknown>;

export type ObjKeyMap<T> = Record<keyof T, string>;

export function withProperties<A, B>(component: A, properties: B): A & B {
  if (properties instanceof Object) {
    Object.keys(properties).forEach(key => {
      (component as ObjectType)[key] = (properties as ObjectType)[key];
    });
  }

  return component as A & B;
}
