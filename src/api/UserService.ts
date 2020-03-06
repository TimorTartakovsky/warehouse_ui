import HttpService from "./HttpService";
import { IUser } from "../store/user/user.types";

export interface IUserService {
    login: (u: string, p: string) => Promise<boolean>;
    verifyToken: (t: string) => Promise<boolean>;
    whoAmI: () => Promise<IUser>;
}

class UserService extends HttpService implements IUserService {

    private httpService: HttpService;
    
    constructor() {
        super();
        this.httpService = new HttpService();
    }

    public login = async  (username: string, password: string): Promise<boolean> => {
        try {
            const result = await this.httpService.post(
                `authLogin/login`,
                { userName: username, password },
            );
            return result;
        } catch(e) {
            console.error(`LoginService -> login -> failed to login.`);
            return false;
        }
    };

    public whoAmI = async (): Promise<IUser> => {
        try {
            const result = await this.httpService.post(`authMe/me`, {});
            return result;
        } catch(e) {
            console.error(`LoginService -> whoAmI -> failed to fetch user.`);
            throw new Error(`Cannot find user in the system.`);
        }
    }

    public verifyToken = async  (token: string): Promise<boolean> => {
        try {
            await this.httpService.get(`equipment/apply/${token}`);
            this.httpService.setToken(token);
            return true;
        } catch(e) {
            console.error(`LoginService -> login -> failed to login.`);
            return false;
        }
    };

}

export default new UserService();