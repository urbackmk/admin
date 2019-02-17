import {
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  REQUEST_EVENTS_SUCCESS,
  REQUEST_PENDING_EVENTS_SUCCESS,
  REQUEST_EVENTS_FAILED,
  ARCHIVE_EVENT_SUCCESS,
  APPROVE_EVENT_SUCCESS,
  REQUEST_OLD_EVENTS_SUCCESS,
} from "./constants";
import { filter } from "lodash";

const initialState = {
  allEvents: {},
  allOldEvents: {},
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload,
        error: null
      };
    case REQUEST_OLD_EVENTS_SUCCESS:
    console.log(action.payload)
       return {
         ...state,
         allOldEvents: action.payload,
         error: null
       };
    case REQUEST_EVENTS_FAILED:
      console.log(`GET_EVENTS_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: filter(state.allEvents, (ele) => ele.eventId !== action.payload)
      }
    case ARCHIVE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: filter(state.allEvents, (ele) => ele.eventId !== action.payload)
      }
    case APPROVE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: filter(state.allEvents, (ele) => ele.eventId !== action.payload)
      }
    case DELETE_EVENT_FAIL: 
      console.log(action.payload)
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default eventReducer;