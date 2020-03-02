import React, {Suspense} from 'react';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PATHS } from './consts';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import './ApplicationWarehouse.scss';
import LoginPage from './components/Auth/Login';
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';
import { PresentationLayout, CollapsedSidebar, LeftSidebar } from './components/Layout/';

// COVER REACT IN TYPESCRIPT GAP
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
// USED FOR DEV TOOLS OF THE REDUX
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(logger)
));

// RUNS REDUX SAGA ON SPECIFIC SAGA
sagaMiddleware.run(rootSaga);


function ApplicationWarehouse() {
  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClimbingBoxLoader color={'#5383ff'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Please wait while we load the live preview examples
            <span className="font-size-lg d-block text-dark">
              This live preview instance can be slower than a real production
              build!
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <Provider store={store} >
      <BrowserRouter basename="/">
          <CssBaseline />
            <ThemeProvider theme={MuiTheme}>
              <AnimatePresence>
                <Suspense fallback={<SuspenseLoading />}>
                  <Switch> 
                    <Route path="/login" exact component={LoginPage}/>
                    {
                      PATHS.ROUTES.map(
                        (r: PATHS.IPath) => (<Route key={r.path} path={r.path} exact component={r.component} />))
                    }
                    {/* <PresentationLayout> */}
                      {/* <CollapsedSidebar>
                      </CollapsedSidebar> */}
                      {/* <LeftSidebar> */}
                      {/* </LeftSidebar> */}
                    {/* </PresentationLayout> */}
                    <Redirect path="*" to="/login" />
                    <Redirect exact from="/" to="/login" />
                  </Switch>
                </Suspense>
              </AnimatePresence>
            </ThemeProvider>
            
      </BrowserRouter>
    </Provider>
  );
}

export default ApplicationWarehouse;
