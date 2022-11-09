import {ArrayConstructor, ObjectConstructor} from "./GenericConstructors";

interface ITour {
  id: number,
  details: string,
  location: string,
  meeting_point: string,
  price: number,
  package_id: number
}

interface ToursConstructor extends ArrayConstructor<ITour>{}
interface TourConstructor extends ObjectConstructor<ITour>{}

export var Tour: ITour;
export var Tours: ITour[];
export var TourArray: ToursConstructor;
export var TourConstructor: TourConstructor;