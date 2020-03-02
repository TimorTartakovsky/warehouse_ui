import HttpService from "./HttpService";

export interface ILoginService {
    login: (u: string, p: string) => Promise<boolean>;
    verifyToken: (t: string) => Promise<boolean>;
}

class LoginService extends HttpService implements ILoginService {

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

export default new LoginService();