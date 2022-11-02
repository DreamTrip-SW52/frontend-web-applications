interface IAgency {
  id: number,
  name: string,
  ruc: string,
  email: string,
  password: string,
  photo: string
}

interface AgencyConstructor {
  new(): IAgency;
  readonly prototype: IAgency;
  new(value?: any): IAgency;
  (value?: any): IAgency;
}

export var Agency: AgencyConstructor;
export var IAgency: IAgency;