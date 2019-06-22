import {
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS,
    UPDATE_EMAIL_DATA,
    REQUEST_EDIT_SUBSCRIBER,
  } from "./constants";

export const submitSubscriber = person => ({
    type: SUBMIT_SUBSCRIBER,
    payload: person
});

export const requestAllSubscribers = () => ({
  type: REQUEST_ALL_SUBSCRIBERS,
});

export const updateEmailDataSource = (input) => ({
  type: UPDATE_EMAIL_DATA,
  payload: input
});

export const requestEditSubscriber = (email) => ({
  type: REQUEST_EDIT_SUBSCRIBER,
  payload: email
});