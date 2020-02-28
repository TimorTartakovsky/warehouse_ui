import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import './ApplicationWarehouse.scss';
import { PATHS } from './consts';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store';
// import ScrollToTop from './components/Shared/ScrollToTop';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// TODO: remove any and use proper types
const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      console.log(`[WarehouseMiddleWare] Dispatching`, action);
      next(action);
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

function ApplicationWarehouse() {
  return (
    <Provider store={store} >
      <BrowserRouter basename="/">
          <CssBaseline>
            <Switch>  
            { PATHS.ROUTES.map((r: PATHS.IPath) => (<Route key={r.path} path={r.path} exact component={r.component} />)) }
            <Redirect path="*" to="/login"></Redirect>
            </Switch>
          </CssBaseline>
      </BrowserRouter>
    </Provider>
  );
}

export default ApplicationWarehouse;
