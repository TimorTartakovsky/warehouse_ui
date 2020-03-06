import { USER_ACTIONS, IActionPayload } from '../../actions';
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
    isRequestSent: boolean;
    isRequestFailed: boolean;
    failedErrorMessage: string;
}

const initialUserState: IUserState = {
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
    isRequestSent: false,
    isRequestFailed: false,
    operationEndHour: '0000-00-00 00:00:00',
    operationStartHour: '0000-00-00 00:00:00',
    credentialsExpired: false,
    failedErrorMessage: '',
    credentialsExpiredAt: new Date(),
}

export class UserState implements IUserState {
    
    public id?: number = initialUserState.id;
    public busy: boolean = initialUserState.busy;
    public role: number = initialUserState.role;
    public active: boolean = initialUserState.active;
    public expired: boolean = initialUserState.expired;
    public workDays: number = initialUserState.workDays;
    public userName: string = initialUserState.userName;
    public shelving: boolean = initialUserState.shelving;
    public lastName: string = initialUserState.lastName;
    public firstName: string = initialUserState.firstName;
    public lastLogin: Date = initialUserState.lastLogin;
    public unloading: boolean = initialUserState.unloading;
    public truckPick: boolean = initialUserState.truckPick;
    public truckPack: boolean = initialUserState.truckPack;
    public expiredAt: Date = initialUserState.expiredAt;
    public createdAt: Date = initialUserState.createdAt;
    public updatedAt: Date = initialUserState.updatedAt;
    public logStatus: number = initialUserState.logStatus;
    public locationId: number = initialUserState.locationId;
    public expressPack: boolean = initialUserState.expressPack;
    public expressPick: boolean = initialUserState.expressPick;
    public shipRestock: boolean = initialUserState.shipRestock;
    public shelvingRga: boolean = initialUserState.shelvingRga;
    public willcallPick: boolean = initialUserState.willcallPack;
    public willcallPack: boolean = initialUserState.willcallPick;
    public unloadingRga: boolean = initialUserState.unloadingRga;
    public isRequestSent: boolean = initialUserState.isRequestSent;
    public isRequestFailed: boolean = initialUserState.isRequestFailed;
    public operationEndHour: string = initialUserState.operationEndHour;
    public failedErrorMessage: string = initialUserState.failedErrorMessage;
    public operationStartHour: string = initialUserState.operationStartHour;
    public credentialsExpired: boolean = initialUserState.credentialsExpired;
    public credentialsExpiredAt: Date = initialUserState.credentialsExpiredAt;

    constructor(p?: IUserState) {
        if (!p) {
            return this;
        }
        const {
            id, busy, role, active, expired, workDays, userName, shelving, lastName,
            firstName, lastLogin, unloading, truckPick, truckPack, expiredAt, createdAt,
            updatedAt, logStatus, locationId, expressPick, expressPack, shipRestock, shelvingRga,
            willcallPick, willcallPack, unloadingRga, isRequestSent, isRequestFailed, operationEndHour,
            failedErrorMessage, operationStartHour, credentialsExpired, credentialsExpiredAt } = p;
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
        this.isRequestSent = isRequestSent;
        this.isRequestFailed = isRequestFailed;
        this.operationEndHour = operationEndHour;
        this.failedErrorMessage = failedErrorMessage;
        this.operationStartHour = operationStartHour;
        this.credentialsExpired = credentialsExpired;
        this.credentialsExpiredAt = credentialsExpiredAt;
    }

}

const userReducer = (state: IUserState = initialUserState, actions: IActionPayload): IUserState => {
    switch(actions.type) {
        case USER_ACTIONS.USER_ACTION_START:
        case USER_ACTIONS.USER_ACTION_REQUEST:
            return {
                ...state,
                isRequestSent: true,
            };
        case USER_ACTIONS.USER_ACTION_REQUEST_SUCCESS:
            const user = new UserState(actions.payload as UserState)
            return {
                ...state,
                ...user,
            }
        case USER_ACTIONS.USER_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isRequestFailed: actions.payload.isRequestFailed,
                failedErrorMessage: actions.payload.failedErrorMessage

            }
        default: return state; 
    }
}

export default userReducer;