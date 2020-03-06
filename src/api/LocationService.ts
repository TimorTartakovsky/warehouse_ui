import HttpService from "./HttpService";
import { ILocationResponse } from "../store/user/location.types";

export interface ILocationService {
    getLocationById: (locationId: number) => Promise<ILocationResponse>;
}

export class LocationService extends HttpService implements ILocationService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    getLocationById = async (locationId: number): Promise<ILocationResponse> => {
        try {
            const locationResponse = await this.httpService.get(`location/${locationId}`);
            return locationResponse;
        } catch (e) {
            throw new Error(`LocationService -> getLocationById -> cannot get location.`);
        }
    }

}

export default new LocationService();