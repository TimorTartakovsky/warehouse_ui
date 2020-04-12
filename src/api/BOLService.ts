import HttpService from "./HttpService";
import {
    BOLRequestProps, RecallMonitoringProps, UpdateProcessProps, ConflictAddressType, UpdateAddress,
    ProcessingGetInfo, ProcessingInfo,
} from '../actions/bol.action';
import { IBOLMonitoring, IBOLProcessing } from "../store/bol/types";

export interface IBOLService {
    getBOLMonitoring: (p: BOLRequestProps) => Promise<IBOLMonitoring[]>;
    getBOLProcessing: (p: BOLRequestProps) => Promise<IBOLProcessing[]>;
    recallMonitoringReSign: (p: RecallMonitoringProps) => Promise<void>;
    recallMonitoringChangeStatus: (p: RecallMonitoringProps) => Promise<void>;
    getProcessConflictAddress: (p: number[]) => Promise<ConflictAddressType[]>;
    getInfo: (p: ProcessingGetInfo) => Promise<ProcessingInfo>;
}

export class BOLService extends HttpService implements IBOLService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    getProcessConflictAddress = async (props: number[]): Promise<ConflictAddressType[]> => {
        try {
            const length = props.length - 1;
            const queryParams = props.reduce((acc: string, id: number, i: number) => {
                acc += `shipToIds=${id}${(length === i) ? '' : '&' }`;
                return acc;
            }, '');
            const conflictAddress = await this.httpService.get(`/bol/getConflictedShipToAddresses?${queryParams}`);
            return conflictAddress;
        } catch(e) {
            throw new Error(`IBOLService -> getProcessConflictAddress -> get conflict address failed.`);
        }
    }

    getInfo = async (p: ProcessingGetInfo): Promise<ProcessingInfo> => {
        try {
            const queryParams = p.bolIds.reduce((acc: string, id: number) => {
                acc += `&bolIds=${id}`;
                return acc;
            }, '');
            const processInfo = await this.httpService.get(
                `/bol/bolLocationInfo?bolId=${p.bolId}${queryParams}&billToAddressId=${p.billToAddressId}&shipToAddressId=${p.shipToAddressId}`
            );
            return processInfo;
        } catch(e) {
            throw new Error(`IBOLService -> getProcessConflictAddress -> get conflict address failed.`);
        }
    }

    updateAddress = async (props: UpdateAddress): Promise<IBOLProcessing[]> => {
        try {
            const processing = await this.httpService.post(`/bol/updateAddress`, props);
            return processing;
        } catch (e) {
            throw new Error(`IBOLService -> updateAddress -> update address failed.`);
        }
    }

    updateProcess = async (props: UpdateProcessProps): Promise<void> => {
        try {
            const processing = await this.httpService.post(`/bol/update`, props);
            // possible continue
        } catch (e) {
            throw new Error(`IBOLService -> recallMonitoring -> updateProcess failed.`);
        }
    }

    recallMonitoringReSign = async (props: RecallMonitoringProps): Promise<void> => {
        try {
            const processing = await this.httpService.post(`/bol/reSignBol`, props);
            return processing;
        } catch (e) {
            throw new Error(`IBOLService -> recallMonitoring -> monitoring cannot be fetched.`);
        }
    }

    recallMonitoringChangeStatus = async (props: RecallMonitoringProps): Promise<void> => {
        try {
            const processing = await this.httpService.post(`/bol/changeStatus`, props);
            return processing;
        } catch (e) {
            throw new Error(`IBOLService -> recallMonitoring -> monitoring cannot be fetched.`);
        }
    }

    getBOLMonitoring = async (p: BOLRequestProps): Promise<IBOLMonitoring[]> => {
        try {
            const { locationId, branchId } = p;
            const monitorings = await this.httpService
                .get(`bol/monitoring?locationId=${locationId}&branchId=${branchId}`); 
            return monitorings;
        } catch(e) {
            throw new Error(`IBOLService -> getBOLMonitoring -> monitoring cannot be fetched.`);
        }
    }

    getBOLProcessing = async (p: BOLRequestProps): Promise<IBOLProcessing[]> => {
        try {
            const { locationId, branchId } = p;
            const processing = await this.httpService
                .get(`bol/processing?locationId=${locationId}&branchId=${branchId}`);
            return processing;
        } catch(e) {
            throw new Error(`IBOLService -> getBOLProcessing -> processing cannot be fetched.`);
        }
    }

}

export default new BOLService();