import {
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS,
  } from "./constants";

export const submitSubscriber = person => ({
    type: SUBMIT_SUBSCRIBER,
    payload: person
});

export const getAllSubscribers = () => ({
  type: REQUEST_ALL_SUBSCRIBERS,
});