import {
    SUBMIT_SUBSCRIBER_SUCCESS,
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS,
    REQUEST_SUBSCRIBER_BY_EMAIL,
  } from "./constants";

export const submitSubscriber = person => ({
    type: SUBMIT_SUBSCRIBER,
    payload: person
});

export const getAllSubscribers = () => ({
  type: REQUEST_ALL_SUBSCRIBERS,
});