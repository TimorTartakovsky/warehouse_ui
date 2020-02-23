import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationWarehouse from './ApplicationWarehouse';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ApplicationWarehouse />, document.getElementById('root'));
serviceWorker.unregister();
