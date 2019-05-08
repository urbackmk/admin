import { createLogic } from "redux-logic"
import { 
  GET_MOCS,
  GET_MOCS_SUCCESS, 
  GET_MOCS_FAILED, 
  ADD_CANDIDATE, 
  ADD_CANDIDATE_FAILURE, 
  ADD_CANDIDATE_SUCCESS, 
  GET_CONGRESS_BY_SESSION,
  GET_CONGRESS_BY_SESSION_SUCCESS,
  GET_CONGRESS_BY_SESSION_FAILED
} from "./constants";

import Candidate from './candidate-model';
import { map } from "lodash";

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

const getCongressLogic = createLogic({
  type: GET_CONGRESS_BY_SESSION,
    processOptions: {
      successType: GET_CONGRESS_BY_SESSION_SUCCESS,
      failType: GET_CONGRESS_BY_SESSION_FAILED,
    },
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;
    return firebasedb.ref(`moc_by_congress/${action.payload}`).once('value')
      .then((snapshot) => {
          const allIds = snapshot.val();
          const allDataRequests = map(allIds, (id) => firebasedb.ref(`mocData/${id}`).once('value'));
          return Promise.all(allDataRequests).then(allData => {
            const allReturnedData =  map(allData, (snapshot => (snapshot.val())))
            return {
              mocs: allReturnedData,
              key: action.payload,
            }
          })

      })
  }
})

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
  getCongressLogic,
];