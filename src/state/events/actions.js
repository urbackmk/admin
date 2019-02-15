import {
  DELETE_EVENT,
  REQUEST_EVENTS,
  REQUEST_PENDING_EVENTS_SUCCESS,
  REQUEST_EVENTS_FAILED,
  REQUEST_PENDING_EVENTS,
  REQUEST_PENDING_EVENTS_FAILED,
  ARCHIVE_EVENT,
  APPROVE_EVENT,
  REQUEST_OLD_EVENTS,
} from './constants';


export const requestEvents = path => ({
  type: REQUEST_EVENTS,
  payload: path,
});

export const requestOldEvents = path => ({
  type: REQUEST_OLD_EVENTS,
  payload: path,
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

export const requestPendingEventsSuccess = events => ({
  type: REQUEST_PENDING_EVENTS_SUCCESS,
  payload: events
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
})

export const archiveEvent = (townHall, path, archivePath) => ({
  type: ARCHIVE_EVENT,
  payload: {
    townHall,
    path,
    archivePath,
  }
})

export const approveEvent = (townHall, path, livePath) => ({
  type: APPROVE_EVENT,
  payload: {
    townHall,
    path,
    livePath,
  }
})

