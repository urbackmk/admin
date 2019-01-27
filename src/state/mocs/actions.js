export const GET_MOCS = "GET_MOCS";
export const GET_MOCS_SUCCESS = "GET_MOCS_SUCCESS";
export const GET_MOCS_FAILED = "GET_MOCS_FAILED";

export const getMocs = () => ({
  type: GET_MOCS
});

export const getMocsSuccess = mocs => ({
  type: GET_MOCS_SUCCESS,
  payload: mocs
});

export const getMocsFailed = err => ({
  type: GET_MOCS_FAILED,
  payload: err
});
