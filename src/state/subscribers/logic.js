import { createLogic } from "redux-logic"

import { 
  REQUEST_FAILED,
  SUBMIT_SUBSCRIBER,
  SUBMIT_SUBSCRIBER_SUCCESS,
  EDIT_SUBSCRIBER,
  EDIT_SUBSCRIBER_SUCCESS,
  REQUEST_ALL_SUBSCRIBERS,
  REQUEST_ALL_SUBSCRIBERS_SUCCESS,
} from "./constants";

const submitSubscriberLogic = createLogic({
  type: SUBMIT_SUBSCRIBER,
  processOptions: {
    failType: REQUEST_FAILED,
    successType: SUBMIT_SUBSCRIBER_SUCCESS,
  },
  process({
    firebasedb, 
    action,
  }) {
    const { payload } = action;
    const subscriberKey = firebasedb.ref(`subscribers/`).push().key;
    payload.key = null;
    return firebasedb.ref(`subscribers/${subscriberKey}`).update(payload)
      .then(()=> {
        return {
          ...payload,
          key: subscriberKey,
        }
      })
  },
});

const editSubscriberLogic = createLogic({
  type: EDIT_SUBSCRIBER,
  processOptions: {
    failType: REQUEST_FAILED,
    successType: EDIT_SUBSCRIBER_SUCCESS,
  },
  process({
    firebasedb,
    action,
  }) {
    const { payload } = action;
    const update = {...payload, key: null}
    return firebasedb.ref(`subscribers/${payload.key}`).update(update)
      .then(()=> {
        return {
          ...payload,
        }
      })
  },
});

const getAllSubscriberLogic = createLogic({
  type: REQUEST_ALL_SUBSCRIBERS,
  processOptions: {
    failType: REQUEST_FAILED,
    successType: REQUEST_ALL_SUBSCRIBERS_SUCCESS,
  },
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
});

export default [
  submitSubscriberLogic,
  editSubscriberLogic,
  getAllSubscriberLogic,
]