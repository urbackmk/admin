import {
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS,
    UPDATE_EMAIL_DATA,
  } from "./constants";

export const submitSubscriber = person => ({
    type: SUBMIT_SUBSCRIBER,
    payload: person
});

export const getAllSubscribers = () => ({
  type: REQUEST_ALL_SUBSCRIBERS,
});

export const updateEmailDataSource = (input) => ({
  type: UPDATE_EMAIL_DATA,
  payload: input
});