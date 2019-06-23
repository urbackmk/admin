import { createSelector } from 'reselect';

export const getEditSubscriber = state => state.subscribers.editSubscriber;
export const getEmailDataSource = state => state.subscribers.emailDataSource;
export const getSubmitButtonText = state => state.subscribers.submitButtonText;