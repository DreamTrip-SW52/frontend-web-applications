export interface ObjectConstructor<Type> {
  new(): Type;
  readonly prototype: Type;
  (value?: Type): Type;
}

export interface ArrayConstructor<Type> {
  new(arrayLength?: number): Type[];
  (arrayLength?: number): Type[];
  isArray(arg: any): arg is Type[];
  readonly prototype: Type[];
}