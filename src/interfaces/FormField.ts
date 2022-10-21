export interface IFormField {
    label: string,
    title: string,
    value: any,
    requerid: boolean,
    placeholder: string,
    disable?: boolean,
    type: string
}

interface FormFieldConstructor {
    new(): IFormField;
    readonly prototype: IFormField;
    (value?: IFormField): IFormField;
}

interface FormFields {
    readonly prototype: IFormField[];
}

export var FormField: FormFieldConstructor;

export var FormFields: IFormField[]


