import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import axios from "axios";

import event from './event';
import moc from './moc';
import user from './user';

import { firebaseUrl } from '../state/constants';

const reducers = {
  event: event.reducers,
  moc: moc.reducers,
  user: user.reducers
};

const logics = [
  ...event.logics,
  // ...moc.logics,
  // ...user.logics,
];

const reduxLogicDependencies = {
  firebaseUrl: firebaseUrl,
  httpClient: axios,
};

const logicMiddleware = createLogicMiddleware(logics, reduxLogicDependencies);

const middleware = applyMiddleware(
  logicMiddleware
);

export default () => {
  const store = createStore(
    combineReducers(reducers),
    middleware
  );

  return store;
};