import HttpService from "./HttpService";
import { IOrderType } from "../store/order-type/types";

export interface IOrderTypeService {
    getOrderTypes: (l: number) => Promise<IOrderType[]>;
}

class OrderTypeService extends HttpService implements IOrderTypeService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    public getOrderTypes = async (locationId: number): Promise<IOrderType[]> => {
        try {
            const types = await this.httpService.get(`/ordertype?locationId=${locationId}`);
            return types;
        } catch (e) {
            throw new Error(`MonitoringService -> getOrderTypes -> Cannot fetch order types, try letter.`);
        }
    }
}

export default new OrderTypeService();