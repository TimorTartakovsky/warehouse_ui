export interface IFillRate {
    id: number;
    locationId: number;
    level: number;
    fillRatePercentage: number;
    incomingAllocPercentage: number;
    outgoingAllocPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}

export class FillRate implements IFillRate {
    id: number = 0;
    locationId: number = 0;
    level: number = 0;
    fillRatePercentage: number = 0;
    incomingAllocPercentage: number = 0;
    outgoingAllocPercentage: number = 0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(fr: IFillRate) {
        if (!fr) {
            return this;
        }
        const { id, locationId, level, fillRatePercentage,
            incomingAllocPercentage, outgoingAllocPercentage,
            createdAt, updatedAt }  = fr;
        this.id = id;
        this.locationId = locationId;
        this.level = level;
        this.fillRatePercentage = fillRatePercentage;
        this.incomingAllocPercentage = incomingAllocPercentage;
        this.outgoingAllocPercentage = outgoingAllocPercentage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export interface IDoorSetup {
    id: number;
    locationId: number;
    dockNumber: number;
    containerShipment: number;
    salesShipment: number;
    transferShipment: number;
    floorSpace: number;
    temp: number;
}

export class DoorSetup implements IDoorSetup {
    id: number = 0;
    locationId: number = 0;
    dockNumber: number = 0;
    containerShipment: number = 0;
    salesShipment: number = 0;
    transferShipment: number = 0;
    floorSpace: number = 0;
    temp: number = 0;
    constructor(ds: IDoorSetup) {
        const {
            id, locationId, dockNumber, containerShipment,
            salesShipment, transferShipment, floorSpace, temp,
        } = ds;
        this.id = id;
        this.locationId = locationId;
        this.dockNumber = dockNumber;
        this.containerShipment = containerShipment;
        this.salesShipment = salesShipment;
        this.transferShipment = transferShipment;
        this.floorSpace = floorSpace;
        this.temp = temp;
    }
}

export interface IDoorLog {
    name: string;
    shortName: string;
    branchId: number;
    bolNumber: number;
    trNumber: number;
    address: string;
    city: string;
    country: string;
    state: string;
    bolCompanyName: string;
    zip: string;
    phone: string;
    timezone: number;
    primaryEmail: string;
    secondaryEmail: string;
    tertiaryEmail: string;
    genericEmail: string;
    callcenterEmail: string;
    archiveEmail: string;
    palletTrigger: number;
    createdAt: string;
    updatedAt: string;
    opsStartHour: string;
    opsEndHour: string;
    nextBatchNumber: number;
    pickPercentageQueue: number;
    packPercentageQueue: number;
    docks: number;
    activateLocation: boolean;
    activateSystem: boolean;
    exceptionAccess: boolean;
    id: number;
}

export class DoorLog implements IDoorLog {
    name: string = '';
    shortName: string= '';
    branchId: number= 0;
    bolNumber: number= 0;
    trNumber: number= 0;
    address: string= '';
    city: string = '';
    country: string= '';
    state: string= '';
    bolCompanyName: string= '';
    zip: string= '';
    phone: string= '';
    timezone: number = 0;
    primaryEmail: string= '';
    secondaryEmail: string= '';
    tertiaryEmail: string= '';
    genericEmail: string= '';
    callcenterEmail: string= '';
    archiveEmail: string= '';
    palletTrigger: number= 0;
    createdAt: string= '';
    updatedAt: string= '';
    opsStartHour: string= '';
    opsEndHour: string= '';
    nextBatchNumber: number= 0;
    pickPercentageQueue: number= 0;
    packPercentageQueue: number= 0;
    docks: number = 0;
    activateLocation: boolean = false;
    activateSystem: boolean = false;
    exceptionAccess: boolean = false;
    id: number= 0;

    constructor(dl: IDoorLog) {
        if (!dl) {
            return this;
        }
        const {
            name, shortName, branchId, bolNumber, trNumber, address, city, country,
            state, bolCompanyName, zip, phone, timezone, primaryEmail, secondaryEmail,
            tertiaryEmail, genericEmail, callcenterEmail, archiveEmail, palletTrigger,
            createdAt, updatedAt, opsStartHour, opsEndHour, nextBatchNumber, pickPercentageQueue,
            packPercentageQueue, docks, activateLocation, activateSystem, exceptionAccess, id,
        } = dl;
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.branchId = branchId;
        this.bolNumber = bolNumber;
        this.trNumber = trNumber;
        this.address = address;
        this.city = city;
        this.country = country;
        this.state = state;
        this.bolCompanyName = bolCompanyName;
        this.zip = zip;
        this.phone = phone;
        this.timezone = timezone;
        this.primaryEmail = primaryEmail;
        this.secondaryEmail = secondaryEmail;
        this.tertiaryEmail = tertiaryEmail;
        this.genericEmail = genericEmail;
        this.callcenterEmail = callcenterEmail;
        this.archiveEmail = archiveEmail;
        this.palletTrigger = palletTrigger;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.opsStartHour = opsStartHour;
        this.opsEndHour = opsEndHour;
        this.nextBatchNumber = nextBatchNumber;
        this.pickPercentageQueue = pickPercentageQueue;
        this.packPercentageQueue = packPercentageQueue;
        this.docks = docks;
        this.activateLocation = activateLocation;
        this.activateSystem = activateSystem;
        this.exceptionAccess = exceptionAccess;
    }
}

export interface ILocationResponse {
    fillRate?: Array<IFillRate>;
    doorSetup?: Array<IDoorSetup>;
    doorLog?: Array<IDoorLog>;
}