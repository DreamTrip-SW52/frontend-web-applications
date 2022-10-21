interface IUser {
    email: string,
    password: string,
    name: string,
    lastname: string;
    phone: string,
    photo: string,
    dni: string,
    id: number
}

interface UserConstructor {
    new(): IUser;
    readonly prototype: IUser;
    new(value?: any): IUser;
    (value?: any): IUser;
}

export var User: UserConstructor;

export var IUser: IUser;
