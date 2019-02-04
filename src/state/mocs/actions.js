import {
  GET_MOCS, 
  GET_MOCS_SUCCESS,
  GET_MOCS_FAILED,
} from './constants';

export const requestMocIds = () => ({
  type: GET_MOCS
});

export const getMocsSuccess = mocs => ({
  type: GET_MOCS_SUCCESS,
  payload: mocs
});

export const getMocsFailed = err => ({
  type: GET_MOCS_FAILED,
  payload: err
});
