import { 
  REQUEST_RESEARCHER, 
  GET_USERS_SUCCESS, 
  REQUEST_USER_BY_ID_FAILED, 
  REQUEST_USER_BY_ID, 
  RECEIVE_USER,
  UPDATE_USER_MOCS,
  REMOVE_ASSIGNMENT,
  ASSIGN_MOC_TO_USER,
  ADD_AND_ASSIGN_TO_USER,
  SUBMIT_REQUEST_ACCESS,
  REQUEST_PENDING_USERS,
  APPROVE_USER_REQUEST,
} from "./constants";

export const requestAllResearchers = () => ({
  type: REQUEST_RESEARCHER
});

export const requestCurrentPendingUsers = () => ({
  type: REQUEST_PENDING_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getUserByIdFailed = err => ({
  type: REQUEST_USER_BY_ID_FAILED,
  payload: err
});

export const requestUserById = (uid, email, username) => ({
  type: REQUEST_USER_BY_ID,
  payload: {
    uid,
    email,
    username,
  }
})

export const submitRequestAccess = (user, accessForm) => ({
  type: SUBMIT_REQUEST_ACCESS,
  payload: {
    user,
    accessForm,
  }
})

export const approveUserRequest = (uid, accessLevel) => ({
  type: APPROVE_USER_REQUEST, 
  payload: {
    uid,
    accessLevel,
  }
})

export const rejectUserRequest = (uid) => ({
  type: APPROVE_USER_REQUEST,
  payload: {
    uid,
  }
})

export const receiveUser = user => ({
  type: RECEIVE_USER, 
  payload: user
})

export const updateUserMocs = (mocList) => ({
  type: UPDATE_USER_MOCS,
  payload: {
    mocList,
  }
})

export const removeAssignment = (userId, mocId) => ({
  type: REMOVE_ASSIGNMENT,
  payload: {
    userId,
    mocId
  }
})

export const assignMocToUser = (userId, mocId) => ({
  type: ASSIGN_MOC_TO_USER,
  payload: {
    userId,
    mocId
  }
})

export const addAndAssignToUser = (userId, mocId, name) => ({
  type: ADD_AND_ASSIGN_TO_USER,
  payload: {
    userId,
    mocId,
    name
  }
})
