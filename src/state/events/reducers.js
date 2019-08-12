import moment from 'moment';

import {
  DELETE_EVENT_SUCCESS,
  REQUEST_EVENTS_SUCCESS,
  REQUEST_EVENTS_FAILED,
  ARCHIVE_EVENT_SUCCESS,
  APPROVE_EVENT_SUCCESS,
  REQUEST_OLD_EVENTS_SUCCESS,
  SET_LOADING,
  UPDATE_EVENT_SUCCESS,
  GET_USER_EMAIL_FOR_EVENT_SUCCESS,
  GET_USER_EMAIL_FOR_OLD_EVENT_SUCCESS,
  RESET_OLD_EVENTS,
  REQUEST_EVENTS_COUNTS_SUCCESS,
  REQUEST_EVENTS_COUNTS_FAIL,
  CLEAR_EVENTS_COUNTS,
  DECREMENT_EVENTS,
  DECREMENT_TOTAL_EVENTS,
  REQUEST_TOTAL_EVENTS_COUNTS_SUCCESS,
  GENERAL_FAIL,
  SET_LAT_LNG,
  SET_START_TIME,
  SET_END_TIME,
  SET_DATE,
  SET_TIME_ZONE,
} from "./constants";
import { filter, map } from "lodash";

const initialState = {
  allEvents: {},
  allOldEvents: {},
  eventsCounts: {},
  totalEventsCounts: {},
  error: null,
  loading: false,
};

const timeFormats = ['hh:mm A', 'h:mm A'];

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: payload,
        error: null
      };
    case REQUEST_OLD_EVENTS_SUCCESS:
      return {
        ...state,
        allOldEvents: [...state.allOldEvents, ...payload],
        error: null
      };
    case GET_USER_EMAIL_FOR_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: state.allEvents.map((event) => event.eventId === payload.eventId ? {
          ...event,
          userEmail: payload.email
        } : event)
    };
    case GET_USER_EMAIL_FOR_OLD_EVENT_SUCCESS:
      console.log(payload)
      return {
        ...state,
        allOldEvents: state.allOldEvents.map((event) => event.eventId === payload.eventId ? {
          ...event,
          userEmail: payload.email
        } : event)
      };
    case RESET_OLD_EVENTS:
      return {
        ...state,
        allOldEvents: [],
        error: null,
      }
    case REQUEST_EVENTS_FAILED:
      console.log(`GET_EVENTS_FAILED: ${payload}`);
      return {
        ...state,
        error: payload
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: filter(state.allEvents, (ele) => ele.eventId !== payload)
      }
    case ARCHIVE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: filter(state.allEvents, (ele) => ele.eventId !== payload)
      }
    case APPROVE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: filter(state.allEvents, (ele) => ele.eventId !== payload)
      }
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      }
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: map(state.allEvents, (ele) => {
          if(ele.eventId === payload.eventId) {
            return {...ele, ...payload}
          }
          return ele
        })
      }
      case SET_START_TIME:
      return {
        ...state,
        timeStart24: moment(payload, timeFormats).format('HH:mm:ss'),
        Time: moment(payload, timeFormats).format('h:mm A'),
        timeEnd24: moment(payload, timeFormats).add(2, 'h').format('HH:mm:ss'),
        timeEnd: moment(payload, timeFormats).add(2, 'h').format('h:mm A'),
      };
      case SET_END_TIME:
      return {
        ...state,
        timeEnd24: moment(payload, timeFormats).format('HH:mm:ss'),
        timeEnd: moment(payload, timeFormats).format('h:mm A'),
      };
      case SET_DATE:
      return {
        ...state,
        yearMonthDay: moment(payload).format('YYYY-MM-DD'),
        dateString: moment(payload).format('ddd, MMM D YYYY'),
      };
      case SET_LAT_LNG:
      return {
        ...state,
        lat: payload.lat,
        lng: payload.lng,
        address: payload.address,
        state: state.state || payload.state || null,
        stateName: state.stateName || payload.stateName || null,
      };
      case SET_TIME_ZONE:
      return {
        ...state,
        zoneString: payload.zoneString,
        timeZone: payload.timeZone,
        dateObj: payload.dateObj,
      };
    case REQUEST_EVENTS_COUNTS_SUCCESS:
      return {
        ...state,
        eventsCounts: payload,
      }
    case REQUEST_TOTAL_EVENTS_COUNTS_SUCCESS:
      return {
        ...state,
        totalEventsCounts: payload
      }
    case CLEAR_EVENTS_COUNTS:
      return {
        ...state,
        eventsCounts: {},
        error: null,
      }
    case DECREMENT_EVENTS:
      return {
        ...state,
        eventsCounts: {
          ...state.eventsCounts,
          [payload]: state.eventsCounts[payload] -= 1,
        }
      }
    case DECREMENT_TOTAL_EVENTS:
      return {
        ...state,
        totalEventsCounts: {
          ...state.totalEventsCounts,
          [payload]: state.totalEventsCounts[payload] -= 1,
        }
      }
    case REQUEST_EVENTS_COUNTS_FAIL:
      console.log(payload);
      return {
        ...state,
        error: payload
      };
    case GENERAL_FAIL:
      console.log(payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default eventReducer;