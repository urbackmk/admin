import {
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  REQUEST_EVENTS,
  REQUEST_PENDING_EVENTS_SUCCESS,
  REQUEST_EVENTS_FAILED,
  REQUEST_PENDING_EVENTS,
  REQUEST_PENDING_EVENTS_FAILED,
  ARCHIVE_EVENT,
  ARCHIVE_EVENT_SUCCESS,
  APPROVE_EVENT,
  APPROVE_EVENT_SUCCESS,
  REQUEST_OLD_EVENTS,
  REQUEST_OLD_EVENTS_SUCCESS,
  RESET_OLD_EVENTS,
  SET_LOADING,
  UPDATE_EXISTING_EVENT,
  GET_USER_EMAIL_FOR_EVENT,
  REQUEST_EVENTS_SUCCESS,
  REQUEST_EVENTS_COUNTS,
  REQUEST_EVENTS_COUNTS_SUCCESS,
  CLEAR_EVENTS_COUNTS,
  DECREMENT_EVENTS,
  DECREMENT_TOTAL_EVENTS,
  REQUEST_TOTAL_EVENTS_COUNTS,
  REQUEST_TOTAL_EVENTS_COUNTS_SUCCESS,
} from './constants';
import request from 'superagent';
import moment from 'moment';


export const requestEvents = path => ({
  type: REQUEST_EVENTS,
  payload: path,
});

export const storeEventsInState = events => ({
  type: REQUEST_EVENTS_SUCCESS,
  payload: events,
});

export const resetOldEvents = () => ({
  type: RESET_OLD_EVENTS,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const requestOldEvents = (path, date, dates) => ({
    type: REQUEST_OLD_EVENTS,
    payload: {
        path,
        date,
        dates,
    }
})
  
export const addOldEventToState = events => ({
  type: REQUEST_OLD_EVENTS_SUCCESS,
  payload: events
});

export const joinEnteredByEmailForEvents = (uid, eventId) => ({
  type: GET_USER_EMAIL_FOR_EVENT,
  payload: {
    uid,
    eventId,
  }
});

export const getEventsSuccess = events => ({
  type: REQUEST_PENDING_EVENTS_SUCCESS,
  payload: events
});

export const getEventsFailed = err => ({
  type: REQUEST_EVENTS_FAILED,
  payload: err
});

export const requestPendingEvents = () => ({
  type: REQUEST_PENDING_EVENTS
});

export const requestPendingEventsFailed = err => ({
  type: REQUEST_PENDING_EVENTS_FAILED,
  payload: err
});

export const deleteEvent = (townHall, path) => ({
  type: DELETE_EVENT, 
  payload: {
    townHall,
    path,
  }
});

export const deleteEventSuccess = (eventId) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventId,
});

export const archiveEvent = (townHall, path, archivePath) => ({
  type: ARCHIVE_EVENT,
  payload: {
    townHall,
    path,
    archivePath,
  }
});

export const archiveEventSuccess = (eventId) => ({
  type: ARCHIVE_EVENT_SUCCESS,
  payload: eventId,
});

export const approveEvent = (townHall, path, livePath) => ({
  type: APPROVE_EVENT,
  payload: {
    townHall,
    path,
    livePath,
  }
});

export const updateExistingEvent = (updateData, path, eventId) => ({
  type: UPDATE_EXISTING_EVENT,
  payload: {
    updateData,
    path,
    eventId,
  }
});

export const requestEventsCounts = (path) => ({
  type: REQUEST_EVENTS_COUNTS,
  payload: path,
});

export const requestEventsCountsSuccess = (payload) => ({
  type: REQUEST_EVENTS_COUNTS_SUCCESS,
  payload: payload,
});

export const requestTotalEventsCounts = () => ({
  type: REQUEST_TOTAL_EVENTS_COUNTS,
});

export const requestTotalEventsCountsSuccess = (payload) => ({
  type: REQUEST_TOTAL_EVENTS_COUNTS_SUCCESS,
  payload: payload,
});

export const clearEventsCounts = () => ({
  type: CLEAR_EVENTS_COUNTS,
});

export const decrementEvents = (key) => ({
  type: DECREMENT_EVENTS,
  payload: key,
});

export const decrementTotalEvents = (key) => ({
  type: DECREMENT_TOTAL_EVENTS,
  payload: key,
});

export const approveEventSuccess = (eventId) => ({
  type: APPROVE_EVENT_SUCCESS,
  payload: eventId,
});

export const setLatLng = payload => ({
  payload,
  type: 'SET_LAT_LNG',
});

export const setDateWithTimeZone = payload => ({
  payload,
  type: 'SET_TIME_ZONE',
});

export const getLatLng = payload => dispatch => request
  .get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDP8q2OVisSLyFyOUU6OTgGjNNQCq7Q3rE')
  .set('Accept', 'application/json')
  .query({
    address: payload,
  })
  .then((r) => {
    console.log(r.body.results[0]);
    const {
      results,
    } = r.body;
    if (results) {
      const res = {
        address: results[0].formatted_address.split(', USA')[0],
        lat: results[0].geometry.location.lat,
        lng: results[0].geometry.location.lng,
      };
      return (dispatch(setLatLng(res)));
    }
    return Promise.reject(new Error('error geocoding'));
  });

export const getTimeZone = payload => (dispatch) => {
  const time = Date.parse(`${payload.date} ${payload.time}`) / 1000;
  const loc = `${payload.lat},${payload.lng}`;
  console.log(time, loc);
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${loc}&timestamp=${time}&key=AIzaSyBvs-ugD9uydf8lUBwiwvN4dB5X9lbgpLw`;
  return request
    .get(url)
    .then((r) => {
      const response = r.body;
      if (!response.timeZoneName) {
        return Error('no timezone results', response);
      }
      const zoneString = response.timeZoneId;
      const timezoneAb = response.timeZoneName.split(' ');
      const timeZone = timezoneAb.reduce((acc, cur) => {
        acc += cur[0];
        return acc;
      }, '');
      const offset = response.rawOffset / 60 / 60 + response.dstOffset / 60 / 60;
      let utcoffset;
      if (Number(offset) === offset) {
        utcoffset = `UTC${offset}00`;
      } else {
        const fract = ((offset * 10) % 10) / 10;
        const integr = Math.trunc(offset);
        let mins = (Math.abs(fract * 60)).toString();
        const zeros = '00';
        mins = zeros.slice(mins.length) + mins;
        utcoffset = `UTC${integr}${mins}`;
      }

      const dateObj = moment(`${payload.date} ${payload.time} ${utcoffset}`).utc().valueOf();
      console.log(dateObj, moment(dateObj).format());
      return (dispatch(setDateWithTimeZone(
        {
          dateObj,
          timeZone,
          zoneString,
        },
      )));
    }).catch((error) => {
      console.log(error);
    });
};