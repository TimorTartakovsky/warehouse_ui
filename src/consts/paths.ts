import WareHouseDashboard from '../components/Dashboard/index';

export interface IPath {
    path: string;
    component: any;
}

export const ROUTES: IPath[] = [
    {
        path: '/dashboard',
        component: WareHouseDashboard,
    }
]