import {Point} from "ol/geom";

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
    uF: string,
}

export interface IConvenience {
    id?: number;
    description: string;
}

export interface IEntrusted {
    id?: number;
    name: string;
    phoneNumber: string;
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
    CEP: string;
    district: string;
    city: ICities;
    coordinate: Point;
    description: string;
    image: Array<IImage>;
}

export interface IModality {
    id?: number;
    description: string;
}

export interface IUse {
    id?: number;
    modality: IModality;
    local: ILocal;
    openingTime: string;
    closingTime: string;
    scheduling: string;
    usageFee: number;
    petAllowed: boolean;
    entrusted: IEntrusted;
    ageGroup: string;
    convenience: IConvenience;
    termsOfUse: string;
    creationDate: string;
    reformDate: string;
    maximumCapacity: number;
    specialMaximumCapacity: number;
}



