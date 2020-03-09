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
    public readonly id: number = 0;
    public readonly locationId: number = 0;
    public readonly level: number = 0;
    public readonly fillRatePercentage: number = 0;
    public readonly incomingAllocPercentage: number = 0;
    public readonly outgoingAllocPercentage: number = 0;
    public readonly createdAt: Date = new Date();
    public readonly updatedAt: Date = new Date();

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
    public readonly id: number = 0;
    public readonly locationId: number = 0;
    public readonly dockNumber: number = 0;
    public readonly containerShipment: number = 0;
    public readonly salesShipment: number = 0;
    public readonly transferShipment: number = 0;
    public readonly floorSpace: number = 0;
    public readonly temp: number = 0;
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
    id: number;
    locationId: number;
    dockDoorNumber: number;
    dockUsedFor: number;
    dockUsedDocNumber: string;
    dockUsedAddDocId: string;
    dockSpaceUsedFor: string;
}

export class DoorLog implements IDoorLog{
    public readonly id: number = 0;
    public readonly locationId: number = 0;
    public readonly dockDoorNumber: number = 0;
    public readonly dockUsedFor: number = 0;
    public readonly dockUsedDocNumber: string ='';
    public readonly dockUsedAddDocId: string ='';
    public readonly dockSpaceUsedFor: string ='';

    constructor(p: IDoorLog) {
        const {
            id, locationId, dockDoorNumber, dockUsedFor,
            dockUsedDocNumber, dockUsedAddDocId, dockSpaceUsedFor,
        } = p;
        this.id = id;
        this.locationId = locationId;
        this.dockDoorNumber = dockDoorNumber;
        this.dockUsedFor = dockUsedFor;
        this.dockUsedDocNumber = dockUsedDocNumber;
        this.dockUsedAddDocId = dockUsedAddDocId;
        this.dockSpaceUsedFor = dockSpaceUsedFor;
    }
}

export interface ILocation {
    fillRate?: Array<IFillRate>;
    doorSetup?: Array<IDoorSetup>;
    doorLog?: Array<IDoorLog>;
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

export class Location implements ILocation {
    public readonly name: string = '';
    public readonly shortName: string= '';
    public readonly branchId: number= 0;
    public readonly bolNumber: number= 0;
    public readonly trNumber: number= 0;
    public readonly address: string= '';
    public readonly city: string = '';
    public readonly country: string= '';
    public readonly state: string= '';
    public readonly bolCompanyName: string= '';
    public readonly zip: string= '';
    public readonly phone: string= '';
    public readonly timezone: number = 0;
    public readonly primaryEmail: string= '';
    public readonly secondaryEmail: string= '';
    public readonly tertiaryEmail: string= '';
    public readonly genericEmail: string= '';
    public readonly callcenterEmail: string= '';
    public readonly archiveEmail: string= '';
    public readonly palletTrigger: number= 0;
    public readonly createdAt: string= '';
    public readonly updatedAt: string= '';
    public readonly opsStartHour: string= '';
    public readonly opsEndHour: string= '';
    public readonly nextBatchNumber: number= 0;
    public readonly pickPercentageQueue: number= 0;
    public readonly packPercentageQueue: number= 0;
    public readonly docks: number = 0;
    public readonly activateLocation: boolean = false;
    public readonly activateSystem: boolean = false;
    public readonly exceptionAccess: boolean = false;
    public readonly id: number= 0;

    constructor(dl: ILocation) {
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
