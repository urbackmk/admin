import {
  map,
  filter,
} from 'lodash';

import { 
  REQUEST_ALL_RSVPS_SUCCESS, 
  RSVP_REQUEST_FAILED, 
  REQUEST_ALL_EVENTS_WITH_RSVPS_SUCCESS
} from "./constants";

const initialState = {
  allRsvps: [],
  allEventsWithRsvps: [],
  error: null,
};

const rsvpReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_ALL_RSVPS_SUCCESS:
    console.log('all rsvps', payload)
      return {
        ...state,
        allRsvps: payload,
        error: null
      };
    case REQUEST_ALL_EVENTS_WITH_RSVPS_SUCCESS:
    console.log('all events', payload)
      return {
        ...state,
        allEventsWithRsvps: payload,
      }
    case RSVP_REQUEST_FAILED:
      console.log(`RSVP REQUEST FAILED: ${payload}`);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default rsvpReducer;