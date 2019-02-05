import { 
  REQUEST_RESEARCHER, 
  GET_USERS_SUCCESS, 
  GET_USERS_FAILED, 
  REQUEST_USER_BY_ID_FAILED, 
  REQUEST_USER_BY_ID, 
  RECEIVE_USER,
  UPDATE_USER_MOCS,
} from "./constants";

export const requestAllResearchers = () => ({
  type: REQUEST_RESEARCHER
});

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getUsersFailed = err => ({
  type: GET_USERS_FAILED,
  payload: err
});

export const getUserByIdFailed = err => ({
  type: REQUEST_USER_BY_ID_FAILED,
  payload: err
});

export const requestUserById = (id) => ({
  type: REQUEST_USER_BY_ID,
  payload: id
})

export const receiveUser = user => ({
  type: RECEIVE_USER, 
  payload: user
})

export const updateUserMocs = (mocData) => ({
  type: UPDATE_USER_MOCS,
  payload: {
    mocData,
  }
})