import {IArrayConstructor, IObjectConstructor} from "./GenericConstructors";

interface IRentCar {
  id: number,
  name: string,
  brand: string,
  address: string,
  capacity: string,
  photo: string,
  price: number,
  pickUp: string,
  dropOff: string
}

interface RentCarsConstructor extends IArrayConstructor<IRentCar>{}
interface RentCarConstructor extends IObjectConstructor<IRentCar>{}

export var RentCar: IRentCar;
export var RentCars: IRentCar[];
export var RentCarArray: RentCarsConstructor;
export var RentCarConstructor: RentCarConstructor;