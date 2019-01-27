import { createSelector } from 'reselect';

export const getAllUsers = state => state.users.allUsers;
export const getUser = state => state.users.user;