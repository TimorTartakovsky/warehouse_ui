import axios, { AxiosInstance } from 'axios';

export interface IHttpService {
    setToken: (token: string) => void;
    unsetToken: () => void;
}

class HttpService implements IHttpService {
    protected readonly instance: AxiosInstance;
    private host = process.env.UIHOST || 'localhost';
    private token: string = '';
    
    constructor() {
        this.instance = axios.create({
            // baseURL: `${this.host}/api`,
            baseURL: 'http://www.mocky.io/v2/',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // this.instance.defaults.withCredentials = true;
    }
    
    unsetToken(): void {};
    setToken(token: string): void {};
}

export default HttpService;