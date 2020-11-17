/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:31:21 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-11-17 12:17:29
 */
import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import mapConfig from '../routes/MapClient/reducers/config';
import map from '../routes/MapClient/reducers/map';
import query from '../routes/MapClient/reducers/query';
import draw from '../routes/MapClient/reducers/draw';
import toolbar from '../routes/MapClient/modules/ToolBar/reducers';
import map3d from '../routes/MapClient/components/MapBoxGL/reducers';
import { routerReducer } from 'react-router-redux';
import {default as thunkMiddleware } from 'redux-thunk';
const { logger } = require(`redux-logger`);
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}


const reducers = combineReducers({
    routerReducer,mapConfig,map,query,draw,toolbar,map3d
});

export default createStore(reducers, applyMiddleware(...middlewares));

