import {IArrayConstructor, IObjectConstructor} from "./GenericConstructors";
interface IAccommodation {
  id: number,
  details: string,
  checkIn: string,
  checkOut: string,
  location: string,
  price: number,
  packageId: number
}

interface AccommodationsConstructor extends IArrayConstructor<IAccommodation> {}

interface AccommodationConstructor extends IObjectConstructor<IAccommodation> {}

export var Accommodation: IAccommodation;
export var Accommodations: IAccommodation[];
export var AccommodationArray: AccommodationsConstructor;
export var AccommodationConstructor: AccommodationConstructor;