import { createLogic } from "redux-logic"
import {
  map,
} from "lodash";

import { 
  REQUEST_FAILED,
  SUBMIT_SUBSCRIBER_SUCCESS,
  SUBMIT_SUBSCRIBER,
} from "./constants";

const submitSubscriberLogic = createLogic({
    process({
        firebasedb, 
        action,
      }) {
      const {
        payload,
      } = action;
      return firebasedb.ref(`subscribers/`).push(payload)
    },
    processOptions: {
      failType: REQUEST_FAILED,
      successType: SUBMIT_SUBSCRIBER_SUCCESS,
    },
    type: SUBMIT_SUBSCRIBER,
  });

export default [
    submitSubscriberLogic,
]