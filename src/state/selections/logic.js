import { createLogic } from "redux-logic"
import { GET_URL_HASH, GET_URL_HASH_SUCCESS, SELECTION_REQUEST_FAILED } from "./constants";

const getUrlLogic = createLogic({
  type: GET_URL_HASH,
  processOptions: {
    successType: GET_URL_HASH_SUCCESS,
    failType: SELECTION_REQUEST_FAILED,
  },
  process(deps) {
    const hash = document.location.hash
    console.log(hash.replace((/[#\/]/g), ''))
    return hash.replace((/[#\/]/g), '') || 'dashboard';
  }
});

export default [
    getUrlLogic
];