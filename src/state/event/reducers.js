import { GET_EVENTS_SUCCESS, GET_EVENTS_FAILED } from "./actions";

const initialState = {
  allEvents: null,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload.data,
        error: null
      };
    case GET_EVENTS_FAILED:
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