import { GET_EVENTS_SUCCESS, GET_EVENTS_FAILED, REQUEST_EVENTS, REQUEST_EVENTS_SUCCESS, REQUEST_PENDING_EVENTS_SUCCESS, REQUEST_EVENTS_FAILED } from "./constants";

const initialState = {
  allEvents: [],
  allPendingEvents: [],
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload.data,
        error: null
      };
    case REQUEST_PENDING_EVENTS_SUCCESS:
      return {
        ...state,
        allPendingEvents: action.payload.data,
        error: null
      };
    case REQUEST_EVENTS_FAILED:
      console.log(`GET_EVENTS_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default eventReducer;