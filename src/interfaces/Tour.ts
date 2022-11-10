import {IArrayConstructor, IObjectConstructor} from "./GenericConstructors";

interface ITour {
  id: number,
  details: string,
  location: string,
  meetingPoint: string,
  price: number,
  packageId: number
}

interface ToursConstructor extends IArrayConstructor<ITour>{}
interface TourConstructor extends IObjectConstructor<ITour>{}

export var Tour: ITour;
export var Tours: ITour[];
export var TourArray: ToursConstructor;
export var TourConstructor: TourConstructor;