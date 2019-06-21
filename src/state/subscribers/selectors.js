import { createSelector } from 'reselect';

export const allSubscribers = state => state.subscribers.allSubscribers;
export const emailDataSource = state => state.subscribers.emailDataSource;