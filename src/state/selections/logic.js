import { createLogic } from "redux-logic"
import { GET_URL_HASH, GET_URL_HASH_SUCCESS, SELECTION_REQUEST_FAILED } from "./constants";

const getUrlLogic = createLogic({
  process() {
    const hash = document.location.hash
    return hash.replace((/[#/]/g), '') || 'dashboard';
  },
  processOptions: {
    failType: SELECTION_REQUEST_FAILED,
    successType: GET_URL_HASH_SUCCESS,
  },
  type: GET_URL_HASH,
});

export default [
    getUrlLogic
];