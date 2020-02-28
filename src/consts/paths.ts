import LoginPage from "../components/Auth/Login";

export interface IPath {
    path: string;
    component: any;
}

export const ROUTES: IPath[] = [
    {
        path: '/login',
        component: LoginPage,
    }
]