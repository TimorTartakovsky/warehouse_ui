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
        path: '/location',
        component: WareHouseDashboard,
    },
    {
        path: '/user-set-up',
        component: WareHouseDashboard,
    },
    {
        path: '/order-types',
        component: WareHouseDashboard,
    },
    {
        path: '/calendar',
        component: WareHouseDashboard,
    },
    {
        path: '/monitoring-page',
        component: WareHouseDashboard,
    },
    {
        path: '/container-processing',
        component: WareHouseDashboard,
    },
    {
        path: '/container-monitoring',
        component: WareHouseDashboard,
    },
    {
        path: '/transfer-in-processing',
        component: WareHouseDashboard,
    },
    {
        path: '/transfer-in-monitoring',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-ship-confirm',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-packing-list',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-bol-reprint',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-bin-location',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-container-summary',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-trx-summary',
        component: WareHouseDashboard,
    },
    {
        path: '/reports-rga',
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