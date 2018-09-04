import { createLogic } from "redux-logic"
import { firebaseUrl } from '../constants';
import { GET_MOCS, GET_MOCS_SUCCESS, GET_MOCS_FAILED } from "./actions";

const fetchMocs = createLogic({
  type: GET_MOCS,
  processOptions: {
    successType: GET_MOCS_SUCCESS,
    failType: GET_MOCS_FAILED,
  },
  process() {
    return httpClient.get(`${firebaseUrl}/mocData.json`)
      .then((mocs) => mocs)
      .catch((err) => err);
  }
});

export default fetchMocs;