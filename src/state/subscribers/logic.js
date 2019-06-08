import { createLogic } from "redux-logic"
import {
  map,
} from "lodash";

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
      const newKey = firebasedb.ref(`subscribers/`).push().key;
      return firebasedb.ref(`subscribers/${newKey}`).update(payload)
      .then(()=> {
        return {
          ...payload,
          key: newKey,
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