import {
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS,
    REQUEST_EDIT_SUBSCRIBER,
  } from "./constants";

export const submitSubscriber = person => ({
    type: SUBMIT_SUBSCRIBER,
    payload: person
});

export const requestAllSubscribers = () => ({
  type: REQUEST_ALL_SUBSCRIBERS,
});

export const requestEditSubscriber = (email) => ({
  type: REQUEST_EDIT_SUBSCRIBER,
  payload: email
});