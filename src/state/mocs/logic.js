import { createLogic } from "redux-logic"
import { GET_MOCS, GET_MOCS_SUCCESS, GET_MOCS_FAILED } from "./actions";

const fetchMocs = createLogic({
  type: GET_MOCS,
  processOptions: {
    successType: GET_MOCS_SUCCESS,
    failType: GET_MOCS_FAILED,
  },
  process(deps) {
    return deps.httpClient.get(`${deps.firebaseUrl}/mocData.json`);
  }
});

export default fetchMocs;