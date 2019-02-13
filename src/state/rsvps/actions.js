import { 
  REQUEST_ALL_RSVPS, 
  REQUEST_ALL_EVENTS_WITH_RSVPS,
  REQUEST_ALL_RSVPS_SUCCESS
} from "./constants";

export const requestAllRsvps = () => ({
  type: REQUEST_ALL_RSVPS
});

export const requestAllEventsWithRSVPs = (payload) => ({
  type: REQUEST_ALL_EVENTS_WITH_RSVPS,
  payload,
});

export const receiveRsvps = (payload) => ({
  type: REQUEST_ALL_RSVPS_SUCCESS,
  payload,
});