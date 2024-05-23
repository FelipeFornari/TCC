export interface IUserLogin {
    username: string;
    password: string;
}
export interface IUserSignup {
    displayName: string;
    username: string;
    password: string;
}
export interface ICities {
    id?: number;
    city: string;
    uf: string,
}

export interface IAccessibility{
    id?: number;
    type: string;
}

export interface IConvenience {
    id?: number;
    description: string;
}

export interface IEntrusted {
    id?: number;
    name: string;
    phoneNumber: string;
    email: string;
}

export interface IImage {
    id?: number;
    locals: ILocal;
    imageName?: string;
    contentType?: string;
}

export interface ILocal {
    id?: number;
    name: string;
    street: string;
    number: string;
    cep: string;
    district: string;
    city: ICities;
    coordinate: number[];
    description: string;
    //image: Array<IImage>;
}

export interface IFunctionality {
    id?: number;
    description: string;
}

export interface IUse {
    id?: number;
    functionality: IFunctionality;
    local: ILocal;
    openingTime: string;
    closingTime: string;
    scheduling: boolean;
    usageFee: number;
    petAllowed: boolean;
    entrusted: IEntrusted;
    ageGroup: string;
    convenience: Array<IConvenience>;
    accessibility: Array<IAccessibility>;
    termsOfUse: string;
    creationDate: string;
    reformDate: string;
    maximumCapacity: number;
    specialMaximumCapacity?: number;
}