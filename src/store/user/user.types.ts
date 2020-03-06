import { ILocationResponse } from "./location.types";

export interface IUser {
    id?: number;
    busy: boolean;
    role: number;
    active: boolean;
    expired: boolean;
    workDays: number;
    userName: string;
    shelving: boolean;
    lastName: string;
    firstName: string;
    lastLogin: Date;
    unloading: boolean;
    truckPick: boolean;
    truckPack: boolean;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
    logStatus: number;
    locationId: number;
    expressPick: boolean;
    expressPack: boolean;
    shipRestock: boolean;
    shelvingRga: boolean;
    willcallPick: boolean;
    willcallPack: boolean;
    unloadingRga: boolean;
    operationEndHour: string;
    operationStartHour: string;
    credentialsExpired: boolean;
    credentialsExpiredAt: Date;
}

export interface IUserState extends IUser {
    isUserRequestFailed: boolean;
    userFailedErrorMessage: string;
    isLocationRequestFailed: boolean;
    locationFailedErrorMessage: string;
    location?: ILocationResponse | null; 
}

export const initialUserState: IUserState = {
    id: 0,
    busy: false,
    role: 0,
    active: false,
    expired: false,
    workDays: 130,
    lastName: '',
    shelving: false,
    userName: '',
    firstName: '',
    lastLogin: new Date(),
    unloading: false,
    truckPick: false,
    truckPack: false,
    expiredAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    logStatus: 0,
    locationId: 0,
    expressPick: false,
    expressPack: false,
    shipRestock: false,
    shelvingRga: false,
    willcallPick: false,
    willcallPack: false,
    unloadingRga: false,
    operationEndHour: '0000-00-00 00:00:00',
    operationStartHour: '0000-00-00 00:00:00',
    credentialsExpired: false,
    credentialsExpiredAt: new Date(),
    isUserRequestFailed: false,
    userFailedErrorMessage: '',
    isLocationRequestFailed: false,
    locationFailedErrorMessage: '',
    location: null,
}


export class UserState implements IUserState {
    
    public readonly id?: number = initialUserState.id;
    public readonly busy: boolean = initialUserState.busy;
    public readonly role: number = initialUserState.role;
    public readonly active: boolean = initialUserState.active;
    public readonly expired: boolean = initialUserState.expired;
    public readonly workDays: number = initialUserState.workDays;
    public readonly userName: string = initialUserState.userName;
    public readonly shelving: boolean = initialUserState.shelving;
    public readonly lastName: string = initialUserState.lastName;
    public readonly firstName: string = initialUserState.firstName;
    public readonly lastLogin: Date = initialUserState.lastLogin;
    public readonly unloading: boolean = initialUserState.unloading;
    public readonly truckPick: boolean = initialUserState.truckPick;
    public readonly truckPack: boolean = initialUserState.truckPack;
    public readonly expiredAt: Date = initialUserState.expiredAt;
    public readonly createdAt: Date = initialUserState.createdAt;
    public readonly updatedAt: Date = initialUserState.updatedAt;
    public readonly logStatus: number = initialUserState.logStatus;
    public readonly locationId: number = initialUserState.locationId;
    public readonly expressPack: boolean = initialUserState.expressPack;
    public readonly expressPick: boolean = initialUserState.expressPick;
    public readonly shipRestock: boolean = initialUserState.shipRestock;
    public readonly shelvingRga: boolean = initialUserState.shelvingRga;
    public readonly willcallPick: boolean = initialUserState.willcallPack;
    public readonly willcallPack: boolean = initialUserState.willcallPick;
    public readonly unloadingRga: boolean = initialUserState.unloadingRga;
    public readonly isUserRequestFailed: boolean = initialUserState.isUserRequestFailed;
    public readonly operationEndHour: string = initialUserState.operationEndHour;
    public readonly userFailedErrorMessage: string = initialUserState.userFailedErrorMessage;
    public readonly operationStartHour: string = initialUserState.operationStartHour;
    public readonly credentialsExpired: boolean = initialUserState.credentialsExpired;
    public readonly credentialsExpiredAt: Date = initialUserState.credentialsExpiredAt;
    public readonly isLocationRequestFailed: boolean = initialUserState.isLocationRequestFailed;
    public readonly locationFailedErrorMessage: string = initialUserState.locationFailedErrorMessage;

    constructor(p?: IUserState) {
        if (!p) {
            return this;
        }
        const {
            id, busy, role, active, expired, workDays, userName, shelving, lastName,
            firstName, lastLogin, unloading, truckPick, truckPack, expiredAt, createdAt,
            updatedAt, logStatus, locationId, expressPick, expressPack, shipRestock, shelvingRga,
            willcallPick, willcallPack, unloadingRga, isUserRequestFailed: isRequestFailed, operationEndHour,
            userFailedErrorMessage: failedErrorMessage, operationStartHour, credentialsExpired, credentialsExpiredAt,
            isLocationRequestFailed, locationFailedErrorMessage } = p;
        this.id = id;
        this.busy = busy;
        this.role = role;
        this.active = active;
        this.expired = expired;
        this.workDays = workDays;
        this.userName = userName;
        this.shelving = shelving;
        this.lastName = lastName;
        this.firstName = firstName;
        this.lastLogin = lastLogin;
        this.unloading = unloading;
        this.truckPick = truckPick;
        this.truckPack = truckPack;
        this.expiredAt = expiredAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.logStatus = logStatus;
        this.locationId = locationId;
        this.expressPick = expressPick;
        this.expressPack = expressPack;
        this.shipRestock = shipRestock;
        this.shelvingRga = shelvingRga;
        this.willcallPick = willcallPick;
        this.willcallPack = willcallPack;
        this.unloadingRga = unloadingRga;
        this.isUserRequestFailed = isRequestFailed;
        this.operationEndHour = operationEndHour;
        this.userFailedErrorMessage = failedErrorMessage;
        this.operationStartHour = operationStartHour;
        this.credentialsExpired = credentialsExpired;
        this.credentialsExpiredAt = credentialsExpiredAt;
        this.isLocationRequestFailed = isLocationRequestFailed;
        this.locationFailedErrorMessage = locationFailedErrorMessage;
    }

}