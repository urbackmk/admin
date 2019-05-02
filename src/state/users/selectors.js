import { createSelector } from 'reselect';

export const getUser = state => state.users.user;
export const getPendingUsers = state => state.users.allPendingUsers;

