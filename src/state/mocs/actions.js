import {
  GET_MOCS, 
  GET_MOCS_SUCCESS,
  GET_MOCS_FAILED,
  ADD_CANDIDATE,
  ADD_CANDIDATE_FAILURE,
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

export const saveCandidate = (person) => ({
  type: ADD_CANDIDATE,
  payload: person,
})

export const saveCandidateFailed = (error) => ({
  type: ADD_CANDIDATE_FAILURE,
  payload: error,
})