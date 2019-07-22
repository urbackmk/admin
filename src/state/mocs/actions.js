import {
  GET_MOCS, 
  GET_MOCS_SUCCESS,
  GET_MOCS_FAILED,
  ADD_CANDIDATE,
  ADD_CANDIDATE_FAILURE,
  GET_CONGRESS_BY_SESSION,
  UPDATE_MISSING_MEMBER,
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

export const saveCandidate = (path, person) => ({
  type: ADD_CANDIDATE,
  payload: { 
    person,
    path,
  }
})

export const saveCandidateFailed = (error) => ({
  type: ADD_CANDIDATE_FAILURE,
  payload: error,
})

export const getCongressBySession = (congressId) => ({
  type: GET_CONGRESS_BY_SESSION,
  payload: congressId
})

export const updateMissingMember = (id, missingMember) => ({
  type: UPDATE_MISSING_MEMBER,
    payload: {
      id,
      missingMember,
    }
})