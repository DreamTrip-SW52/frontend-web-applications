export interface IObjectConstructor<Type> {
  new(): Type;
  readonly prototype: Type;
  (value?: any): Type;
  new(value?: any): Type;
}

export interface IArrayConstructor<Type> {
  new(arrayLength?: number): Type[];
  (arrayLength?: number): Type[];
  isArray(arg: any): arg is Type[];
  readonly prototype: Type[];
}

