import { createLogic } from "redux-logic"

import { 
  REQUEST_TOTAL_USERS,
  RECEIVE_TOTAL_USERS,
  REQUEST_FAILED,
  RECEIVE_SMS_CACHE,
  REQUEST_CACHE,
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

const requestCacheLogic = createLogic({
  process({
    firebasedb
  }) {
    return firebasedb.ref('sms-users/cached-users').once('value')
      .then((snapshot) => {
        const toReturn = [];
        snapshot.forEach((ele) => {
          toReturn.push(ele.val())
        })
        return toReturn;
      })
  },
  processOptions: {
    failType: REQUEST_FAILED,
    successType: RECEIVE_SMS_CACHE,
  },
  type: REQUEST_CACHE,
});

// const sendMessageLogic = createLogic({
//     process({
//         firebasedb
//       }) {
//         return firebasedb.ref('sms-users/cached-users').on('child')
//           .then((snapshot) => {
//             return snapshot.numChildren();
//           })
//       },
//       processOptions: {
//         failType: REQUEST_FAILED,
//         successType: RECEIVE_TOTAL_USERS,
//       },
//       type: REQUEST_TOTAL_USERS,
// })

export default [
  requestAllSMSUsersLogic,
  // sendMessageLogic,
  requestCacheLogic,
];