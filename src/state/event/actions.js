export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
export const GET_EVENTS_FAILED = "GET_EVENTS_FAILED";

export const getEvents = () => ({
  type: GET_EVENTS
});

export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: events
});

export const getEventsFailed = err => ({
  type: GET_EVENTS_FAILED,
  payload: err
});
