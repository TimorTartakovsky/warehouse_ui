import HttpService from "./HttpService";
import { IMonitoring } from "../store/monitoring/types";

export type IMonitoringRequestParams = {
    type: number;
    subtype: number;
    locationId: number;
    branchId: number;
}

export interface IMonitoringService {
    getMonitoring: (r: IMonitoringRequestParams) => Promise<IMonitoring[]>;
}

class MonitoringService extends HttpService implements IMonitoringService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    public getMonitoring = async (r: IMonitoringRequestParams): Promise<IMonitoring[]> => {
        try {
            const { branchId, type, subtype, locationId } = r;
            if (!branchId || !locationId) {
                throw new Error(
                    `One of props:
                        branchId=${branchId},
                        type=${type},
                        subtype=${subtype},
                        locationId=${locationId} are didn't passed.`);
            }
            if (!type && !subtype) {
                const monitoring = await this.httpService.get(`monitoring/trxOut`);
                return monitoring
            }
            const monitoring = await this.httpService.get(
                `/manager/monitoring?type=${type}&subtype=${subtype}&locationId=${locationId}&branchId=${branchId}`
            );
            return monitoring;
        } catch (e) {
            throw new Error(`Cannot fetch monitoring, try later.`);
        }
    }

}

export default new MonitoringService();