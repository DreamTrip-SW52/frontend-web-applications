interface ICreditCard {
    id: number,
    userId: number,
    cardNumber: string,
    securityCode: string,
    expirationDate: string,
    type: string
}

export var CreditCard: ICreditCard

export var CreditCards: ICreditCard[]