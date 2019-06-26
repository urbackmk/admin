import {
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS,
    UPDATE_EMAIL_DATA,
    REQUEST_EDIT_SUBSCRIBER,
    UPDATE_SUBMIT_BUTTON_TEXT,
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

export const updateSubmitButtonText = (text) => ({
  type: UPDATE_SUBMIT_BUTTON_TEXT,
  payload: text
});