import {ArrayConstructor, ObjectConstructor} from "./GenericConstructors";
interface IAccommodation {
  id: number,
  details: string,
  check_in: string,
  check_out: string,
  location: string,
  price: number,
  package_id: number
}

interface AccommodationsConstructor extends ArrayConstructor<IAccommodation> {}

interface AccommodationConstructor extends ObjectConstructor<IAccommodation> {}

export var Accommodation: IAccommodation;
export var Accommodations: IAccommodation[];
export var AccommodationArray: AccommodationsConstructor;
export var AccommodationConstructor: AccommodationConstructor;