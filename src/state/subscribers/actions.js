import {
    SUBMIT_SUBSCRIBER_SUCCESS,
    SUBMIT_SUBSCRIBER,
  } from "./constants";

export const submitSubscriber = person => ({
    type: SUBMIT_SUBSCRIBER,
    payload: person
})