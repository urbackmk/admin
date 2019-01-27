import { createLogic } from "redux-logic"
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED, REQUEST_USER_BY_ID, RECEIVE_USER, REQUEST_USER_BY_ID_FAILED } from "./actions";

const fetchUsers = createLogic({
  type: GET_USERS,
  processOptions: {
    successType: GET_USERS_SUCCESS,
    failType: GET_USERS_FAILED,
  },
  process(deps) {
    return deps.httpClient.get(`${deps.firebaseUrl}/users.json`);
  }
});

const fetchUser = createLogic({
  type: REQUEST_USER_BY_ID,
  processOptions: {
    successType: RECEIVE_USER,
    failType: REQUEST_USER_BY_ID_FAILED,
  },
  process(deps) {
    return deps.firebasedb.ref(`users/${deps.action.payload}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        }
      })
  }
});

export default [fetchUsers, fetchUser];