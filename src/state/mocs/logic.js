import { createLogic } from "redux-logic"
import { 
  GET_MOCS,
  GET_MOCS_SUCCESS, 
  GET_MOCS_FAILED, 
  ADD_CANDIDATE, 
  ADD_CANDIDATE_FAILURE, 
  ADD_CANDIDATE_SUCCESS 
} from "./constants";

import Candidate from './candidate-model';

const fetchMocs = createLogic({
  type: GET_MOCS,
  processOptions: {
    successType: GET_MOCS_SUCCESS,
    failType: GET_MOCS_FAILED,
  },
  process(deps) {
    return deps.httpClient.get(`${deps.firebaseUrl}/mocID.json`);
  }
});

const addCandidateLogic = createLogic({
  type: ADD_CANDIDATE,
  processOptions: {
    successType: ADD_CANDIDATE_SUCCESS,
    failType: ADD_CANDIDATE_FAILURE,
  },
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;

      const newId = firebasedb.ref().child('candidate_data').push().key;
      const newCandidate = new Candidate(action.payload);
      const nameKey = newCandidate.createNameKey();

    firebasedb.ref(`candidate_keys/${nameKey}`).update({
      id: newId,
      nameEntered: newCandidate.displayName,
    });
    firebasedb.ref(`candidate_data/${newId}`).update(newCandidate);
  }
});

export default [
  fetchMocs,
  addCandidateLogic,
];