export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";

export const getUsers = () => ({
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
