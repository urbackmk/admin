import { createSelector } from 'reselect';
import {
  ACCESS_KEYS
} from '../../constants';

export const getCurrentUser = state => state.users.user;
export const getPendingUsers = state => state.users.allPendingUsers;

export const getCurrentUserId = createSelector([getCurrentUser], (user) => {
    return user.uid;
});

export const getAdminStatus = createSelector([getCurrentUser], (user) => {
    ACCESS_KEYS.forEach(key => {
        if (user[key]) {
            return key;
        }
    })
})