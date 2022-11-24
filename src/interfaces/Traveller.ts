interface ITraveller {
    email: string,
    password: string,
    name: string,
    lastname: string;
    phone: string,
    photo: string,
    dni: string,
    id: number
}

interface TravellerConstructor {
    new(): ITraveller;
    readonly prototype: ITraveller;
    new(value?: any): ITraveller;
    (value?: any): ITraveller;
}

export var Traveller: TravellerConstructor;

export var ITraveller: ITraveller;
