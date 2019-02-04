import {
  CHANGE_EVENTS_TAB,
} from "./constants";
import { PENDING_EVENTS_TAB } from "../../constants";

const initialState = {
  selectedEventTab: PENDING_EVENTS_TAB,
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EVENTS_TAB:
    console.log(action.payload)
      return {
        ...state,
        selectedEventTab: action.payload,
      };

    default:
      return state;
  }
};

export default selectionReducer;