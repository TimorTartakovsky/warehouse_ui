import HttpService from "./HttpService";
import { ILocation } from "../store/user/location.types";

export interface ILocationService {
    getLocationById: (locationId: number) => Promise<ILocation>;
}

class LocationService extends HttpService implements ILocationService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    public getLocationById = async (locationId: number): Promise<ILocation> => {
        try {
            const locationResponse = await this.httpService.get(`location/${locationId}`);
            return locationResponse;
        } catch (e) {
            throw new Error(`LocationService -> getLocationById -> cannot get location.`);
        }
    }

    public getLocations = async (): Promise<ILocation> => {
        try {
            const locationResponse = await this.httpService.get(`location`);
            return locationResponse;
        } catch (e) {
            throw new Error(`LocationService -> getLocations -> cannot get location.`);
        }
    }

}

export default new LocationService();