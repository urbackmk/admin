import {
  CHANGE_EVENTS_TAB, CHANGE_FEDERAL_STATE_RADIO, GET_URL_HASH_SUCCESS,
} from "./constants";
import { 
  PENDING_EVENTS_TAB, 
  FEDERAL_RADIO_BUTTON,
 } from "../../constants";

const initialState = {
  selectedEventTab: PENDING_EVENTS_TAB,
  federalOrState: FEDERAL_RADIO_BUTTON,
  currentHashLocation: '/',
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EVENTS_TAB:
      return {
        ...state,
        selectedEventTab: action.payload,
      };
    case CHANGE_FEDERAL_STATE_RADIO:
      return {
        ...state,
        federalOrState: action.payload
      }
    case GET_URL_HASH_SUCCESS:
      return {
        ...state,
        currentHashLocation: action.payload
      }
    default:
      return state;
  }
};

export default selectionReducer;