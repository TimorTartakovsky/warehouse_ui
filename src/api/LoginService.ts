import HttpService from "./HttpService";

export interface ILoginService {
    login: (u: string, p: string) => Promise<boolean>;
}

class LoginService extends HttpService implements ILoginService {
    async login(username: string, password: string): Promise<boolean> {
        try {
            return await this.instance.post(`5e58c2c22f0000a206962111`, {
                username, password
            })
        } catch(e) {
            console.error(`ILoginService -> login failed.`);
            return false;
        }
    };

}

export default LoginService;