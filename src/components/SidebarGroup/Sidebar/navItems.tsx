import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import LocationOn from '@material-ui/icons/LocationOn';
import Tune from '@material-ui/icons/Tune';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DvrIcon from '@material-ui/icons/Dvr';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';


const iconsMap: {[k: string]: any} = {
  'BarChartIcon': BarChartIcon,
  'CalendarTodayIcon': CalendarTodayIcon,
  'ChatIcon': ChatIcon,
  'CodeIcon': CodeIcon,
  'DashboardIcon': DashboardIcon,
  'ErrorIcon': ErrorIcon,
  'FolderIcon': FolderIcon,
  'DashboardTwoToneIcon': DashboardTwoToneIcon,
  'GradeTwoTone': GradeTwoTone,
  'ListAltIcon': ListAltIcon,
  'LockOpenIcon': LockOpenIcon,
  'MailIcon': MailIcon,
  'PresentToAllIcon': PresentToAllIcon,
  'PeopleIcon': PeopleIcon,
  'PersonIcon': PersonIcon,
  'ReceiptIcon': ReceiptIcon,
  'SettingsIcon': SettingsIcon,
  'ViewModuleIcon': ViewModuleIcon,
  'LocationOn': LocationOn,
  'Tune': Tune,
  'FormatAlignRightIcon': FormatAlignRightIcon,
  'DateRangeIcon': DateRangeIcon,
  'DvrIcon': DvrIcon,
  'AllInboxIcon': AllInboxIcon,
  'FlightLandIcon': FlightLandIcon,
  'ChromeReaderModeIcon': ChromeReaderModeIcon,
};

export default [
  {
    label: 'Navigation menu',
    content: JSON.parse(
      `[
  {
    "label": "Dashboards",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Default",
        "description": "This is a dashboard page example built using this template.",
        "to": "/dashboard"
      }
    ]
  },
  {
    "label": "Location",
    "icon": "LocationOn",
    "content": [
      {
        "label": "Location Page",
        "description": "Location page is responsible...",
        "to": "/location"
      }
    ]
  },
  {
    "label": "User SetUp",
    "icon": "Tune",
    "content": [
      {
        "label": "User SetUp Page",
        "description": "Settings of the user",
        "to": "/user-set-up"
      }
    ]
  },
  {
    "label": "Order Types",
    "icon": "FormatAlignRightIcon",
    "content": [
      {
        "label": "Order Types Page",
        "description": "Some explanation",
        "to": "/order-types"
      }
    ]
  },
  {
    "label": "Calendar",
    "icon": "DateRangeIcon",
    "content": [
      {
        "label": "Calendar Page",
        "description": "something",
        "to": "/calendar"
      }
    ]
  },
  {
    "label": "Monitoring",
    "icon": "DvrIcon",
    "content": [
      {
        "label": "Monitoring Page",
        "description": "Monitoring Page",
        "to": "/monitoring"
      }
    ]
  },
  {
    "label": "Bill Of Lading",
    "icon": "ReceiptIcon",
    "content": [
      {
        "label": "BOL Processing",
        "description": "BOL Processing",
        "to": "/bol-processing"
      },
      {
        "label": "BOL Monitoring",
        "description": "BOL Monitoring",
        "to": "/bol-monitoring"
      }
    ]
  },
  {
    "label": "Container",
    "icon": "AllInboxIcon",
    "content": [
      {
        "label": "Processing",
        "description": "Processing",
        "to": "/container-processing"
      },
      {
        "label": "Monitoring",
        "description": "Monitoring",
        "to": "/container-monitoring"
      }
    ]
  },
  {
    "label": "Transfer In",
    "icon": "FlightLandIcon",
    "content": [
      {
        "label": "Processing",
        "description": "Transfer In Processing Page",
        "to": "/transfer-in-processing"
      },
      {
        "label": "Monitoring",
        "description": "Transfer In Monitoring Page",
        "to": "/transfer-in-monitoring"
      }
    ]
  },
  {
    "label": "Reports",
    "icon": "ChromeReaderModeIcon",
    "content": [
      {
        "label": "Ship Confirm",
        "description": "Ship Confirm Page",
        "to": "/reports-ship-confirm"
      },
      {
        "label": "Packing List",
        "description": "Packing List Page",
        "to": "/reports-packing-list"
      },
      {
        "label": "BOL Reprint",
        "description": "BOL Reprint Page",
        "to": "/reports-bol-reprint"
      },
      {
        "label": "Bin Location",
        "description": "Bin Location Page",
        "to": "/reports-bin-location"
      },
      {
        "label": "Container Summary",
        "description": "Container Summary Page",
        "to": "/reports-container-summary"
      },
      {
        "label": "Trx Summary",
        "description": "Trx Summary Page",
        "to": "/reports-trx-summary"
      },
      {
        "label": "RGA Report",
        "description": "RGA Report Page",
        "to": "/reports-rga"
      }
    ]
  }
]`,
      (key, value) => {
        if (key === 'icon') {
          return iconsMap[value];
        } else {
          return value;
        }
      }
    )
  }
];
