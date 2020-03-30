import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationWarehouse from './ApplicationWarehouse';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    console.log(`==== Application is running on 'development' mode. ====`);
} else if (process.env.NODE_ENV === 'production') {
    console.log(`==== Application is running on 'production' mode. ====`);
} else {
    console.log(`==== Application is running on 'staging' mode. ====`);
}

ReactDOM.render((
    <CookiesProvider>
        <ApplicationWarehouse />
    </CookiesProvider>
), document.getElementById('root'));
serviceWorker.unregister();
