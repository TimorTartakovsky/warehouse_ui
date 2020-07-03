import HttpService from "./HttpService";
import { IUser } from "../store/user/user.types";
// let socketIOClient = require('socket.io-client');
// let sailsIOClient = require('sails.io.js');

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
            // let io = sailsIOClient(socketIOClient);

            if (process.env.NODE_ENV === "development") {
                // io.url = 'http://localhost:9001';
                // io.sails.url = 'http://localhost:9001';
                // io.connect('http://localhost:9001',{initialConnectionHeaders: {nosession: true}, transports: ['websocket'], upgrade: false });
            } else {
                // io.sails.url = 'http://dev.netvisionllc.com:9001/';
            }
            // io.socket.get('http://localhost:9001', function serverResponded (body: any, JWR: any) {

            //     console.log('Sails responded with: ', body);
            //     console.log('with headers: ', JWR.headers);
            //     console.log('and with status code: ', JWR.statusCode);
          
            // });

            // io.socket.on('manager:bol:', function serverResponded (body: any, JWR: any) {

            //     console.log('Sails responded with: ', body);
            //     console.log('with headers: ', JWR.headers);
            //     console.log('and with status code: ', JWR.statusCode);
          
            // });
            // const data = await this.instance.get(`/socket.io/1/?__sails_io_sdk_version=0.10.0&__sails_io_sdk_platform=browser&__sails_io_sdk_language=javascript&t=${(Date.now())}`);
            // console.log(data);
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