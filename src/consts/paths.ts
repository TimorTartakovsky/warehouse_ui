import WareHouseDashboard from '../components/Dashboard/index';
import BOL, { EBOLTypes } from '../components/BOL';

export interface IPath {
    path: string;
    component: any;
    props?: any;
}

export const ROUTES: IPath[] = [
    {
        path: '/dashboard',
        component: WareHouseDashboard,
    },
    {
        path: '/bol-monitoring',
        component: BOL,
        props: { type: EBOLTypes.BOLMonitoring }
    },
    {
        path: '/bol-processing',
        component: BOL,
        props: { type: EBOLTypes.BOLProcessing }
    }
]