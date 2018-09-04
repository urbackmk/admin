import { createLogic } from "redux-logic"
import { firebaseUrl } from '../constants';
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED } from "./actions";

const fetchUsers = createLogic({
  type: GET_USERS,
  processOptions: {
    successType: GET_USERS_SUCCESS,
    failType: GET_USERS_FAILED,
  },
  process() {
    return httpClient.get(`${firebaseUrl}/users.json`)
      .then((users) => users)
      .catch((err) => err);
  }
});

export default fetchUsers;