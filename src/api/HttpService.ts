import axios, { AxiosInstance } from 'axios';
import * as cookies from 'react-cookie';

export interface IHttpService {
    setToken: (token: string) => void;
    unsetToken: () => void;
}

export const COOKIE_TOKEN_NAME = 'logedin';

class HttpService implements IHttpService {
    protected readonly instance: AxiosInstance;
    private cookies: cookies.Cookies;
    private host = process.env.UIHOST || 'localhost';
    private token: string = '';
    
    constructor() {
        this.cookies = new cookies.Cookies();
        this.token = this.cookies.get(COOKIE_TOKEN_NAME);
        this.instance = axios.create({
            // baseURL: `${this.host}/api`,
            baseURL: 'http://localhost:9001',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        this.instance.interceptors.response.use(
            r => r.data
        );
        // this.instance.defaults.withCredentials = true;
    }
    
    public async post(url: string, body: any): Promise<any> {
        if (this.token) {
            return await this.instance.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${this.token}`,
                }
            });
        }
        return await this.instance.post(url, body);
    }

    public async get(url: string, body?: any): Promise<any> {
        return await this.instance.get(url);
    }

    unsetToken(): void {
        this.cookies.set(COOKIE_TOKEN_NAME, '');
    };
    setToken(token: string): void {
        this.token = token;
        this.cookies.set(COOKIE_TOKEN_NAME, token);
    };
}

export default HttpService;