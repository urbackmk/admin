import { createLogic } from "redux-logic"
import { GET_URL_HASH, GET_URL_HASH_SUCCESS, SELECTION_REQUEST_FAILED, CHANGE_FEDERAL_STATE_RADIO, CHANGE_DATE_LOOKUP } from "./constants";
import { resetOldEvents } from "../events/actions";
import { toggleIncludeLiveEventsInLookup } from "./actions";

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

const onSelectionChangeLogic = createLogic({
  process(deps, dispatch, done) {
    dispatch(resetOldEvents());
    dispatch(toggleIncludeLiveEventsInLookup(false))
    done();
  },
  type: [CHANGE_FEDERAL_STATE_RADIO, CHANGE_DATE_LOOKUP],
});


export default [
    getUrlLogic,
    onSelectionChangeLogic,
];