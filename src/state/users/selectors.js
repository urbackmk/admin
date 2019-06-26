import { createSelector } from 'reselect';
import { MODERATOR_ACCESS
} from '../../constants';

export const getCurrentUser = state => state.users.user;
export const getPendingUsers = state => state.users.allPendingUsers;

export const getCurrentUserEmail = createSelector([getCurrentUser], (user) => {
    return user.email;
});

export const getCurrentUserId = createSelector([getCurrentUser], (user) => {
  return user.uid;
});

export const getModeratorStatus = createSelector([getCurrentUser], (user) => {
    return !!user[MODERATOR_ACCESS]
})
