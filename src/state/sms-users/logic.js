import { createLogic } from "redux-logic"

import { 
  REQUEST_TOTAL_USERS,
  RECEIVE_TOTAL_USERS,
  REQUEST_FAILED,
} from "./constants";

const requestAllSMSUsersLogic = createLogic({
    process({firebasedb}) {
      return firebasedb.ref('sms-users/all-users').once('value')
        .then( (snapshot) => {
          return snapshot.numChildren();
        })
    },
    processOptions: {
      failType: REQUEST_FAILED,
      successType: RECEIVE_TOTAL_USERS,
    },
  type: REQUEST_TOTAL_USERS,
});


export default [
  requestAllSMSUsersLogic,
];