import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationWarehouse from './ApplicationWarehouse';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <CookiesProvider>
        <ApplicationWarehouse />
    </CookiesProvider>
), document.getElementById('root'));
serviceWorker.unregister();
