export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const REQUEST_USER_BY_ID = "REQUEST_USER_BY_ID";
export const RECEIVE_USER = "RECEIVE_USER";
export const REQUEST_USER_BY_ID_FAILED = "REQUEST_USER_BY_ID_FAILED";
export const getAllUsers = () => ({
  type: GET_USERS
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