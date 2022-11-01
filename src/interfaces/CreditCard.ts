
interface ICreditCard {
    id: number,
    userId: number,
    cardNumber: string,
    securityCode: string,
    expirationDate: string
}
interface CreditCardsConstructor {
    new(arrayLength?: number): ICreditCard[];
    (arrayLength?: number): ICreditCard[];
    isArray(arg: any): arg is ICreditCard[];
    readonly prototype: ICreditCard[];
}

interface CreditCardConstructor {
    new(): ICreditCard;
    readonly prototype: ICreditCard;
    (value?: ICreditCard): ICreditCard;
}

export var CreditCard: ICreditCard

export var CreditCards: ICreditCard[]

export var CreditCardArray: CreditCardsConstructor;

export var CreditCardConstructor: CreditCardConstructor;