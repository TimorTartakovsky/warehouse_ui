import HttpService from "./HttpService";
import { BOLRequestProps } from '../actions/bol.action';
import { IBOLMonitoring, IBOLProcessing } from "../store/bol/types";

export interface IBOLService {
    // getLocationById: (locationId: number) => Promise<ILocationResponse>;
    getBOLMonitoring: (p: BOLRequestProps) => Promise<IBOLMonitoring[]>;
    getBOLProcessing: (p: BOLRequestProps) => Promise<IBOLProcessing[]>;
}

export class BOLService extends HttpService implements IBOLService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    getBOLMonitoring = async (p: BOLRequestProps): Promise<IBOLMonitoring[]> => {
        try {
            const { locationId, branchId } = p;
            const monitorings = this.httpService
                .get(`bol/monitoring?locationId=${locationId}&branchId=${branchId}`); 
            return monitorings;
        } catch(e) {
            throw new Error(`IBOLService -> getBOLMonitoring -> monitoring cannot be fetched.`);
        }
    }

    getBOLProcessing = async (p: BOLRequestProps): Promise<IBOLProcessing[]> => {
        try {
            const { locationId, branchId } = p;
            const processing = this.httpService
                .get(`bol/processing?locationId=${locationId}&branchId=${branchId}`);
            return processing;
        } catch(e) {
            throw new Error(`IBOLService -> getBOLProcessing -> processing cannot be fetched.`);
        }
    }

}

export default new BOLService();