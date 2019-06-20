import { createLogic } from "redux-logic"

import { 
  REQUEST_FAILED,
  SUBMIT_SUBSCRIBER_SUCCESS,
  SUBMIT_SUBSCRIBER,
  REQUEST_ALL_SUBSCRIBERS,
  REQUEST_ALL_SUBSCRIBERS_SUCCESS,
} from "./constants";

const submitSubscriberLogic = createLogic({
    process({
        firebasedb, 
        action,
      }) {
      const {
        payload,
      } = action;
      let subKey = '';
      if (payload.key) {
        subKey = payload.key;
      } else {
        subKey = firebasedb.ref(`subscribers/`).push().key;
      }
      delete payload.key;
      return firebasedb.ref(`subscribers/${subKey}`).update(payload)
      .then(()=> {
        return {
          ...payload,
          key: subKey,
        }
      })
    },
    processOptions: {
      failType: REQUEST_FAILED,
      successType: SUBMIT_SUBSCRIBER_SUCCESS,
    },
    type: SUBMIT_SUBSCRIBER,
  });

const getAllSubscriberLogic = createLogic({
  process({
      firebasedb,
    }) {
    return firebasedb.ref(`subscribers/`).once('value')
    .then((snapshot) => {
      const toReturn = [];
      snapshot.forEach(element => {
        toReturn.push({
          ...element.val(),
          key: element.key,
        })
      });
      return toReturn;
    })
  },
  processOptions: {
    failType: REQUEST_FAILED,
    successType: REQUEST_ALL_SUBSCRIBERS_SUCCESS,
  },
  type: REQUEST_ALL_SUBSCRIBERS,
});

export default [
    submitSubscriberLogic,
    getAllSubscriberLogic,
]