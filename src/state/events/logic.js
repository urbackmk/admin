import { createLogic } from "redux-logic"
import { 
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  REQUEST_PENDING_EVENTS, 
  REQUEST_PENDING_EVENTS_SUCCESS, 
  REQUEST_PENDING_EVENTS_FAILED, 
  REQUEST_EVENTS, 
  REQUEST_EVENTS_SUCCESS, 
  REQUEST_EVENTS_FAILED,
} from "./constants";

const fetchEvents = createLogic({
  type: REQUEST_EVENTS,
  processOptions: {
    successType: REQUEST_EVENTS_SUCCESS,
    failType: REQUEST_EVENTS_FAILED,
  },
  process(deps) {
    return deps.httpClient.get(`${deps.firebaseUrl}/townHalls.json`);
  }
});

const fetchPendingEvents = createLogic({
  type: REQUEST_PENDING_EVENTS,
  processOptions: {
    successType: REQUEST_PENDING_EVENTS_SUCCESS,
    failType: REQUEST_PENDING_EVENTS_FAILED,
  },
  process(deps) {
    return deps.httpClient.get(`${deps.firebaseUrl}/UserSubmissions.json`);
  }
});

const deleteEvent = createLogic({
  type: DELETE_EVENT,
  processOptions: {
    successType: DELETE_EVENT_SUCCESS,
    failType: DELETE_EVENT_FAIL,
  },
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;
    const { townHall, path } = action.payload;
    console.log(`${path}/${townHall.eventId}`)
    const oldTownHall = firebasedb.ref(`${path}/${townHall.eventId}`);
    // if (path === 'townHalls') {
    //   firebasedb.ref(`/townHallIds/${townHall.eventId}`).update({
    //     eventId: townHall.eventId,
    //     lastUpdated: (Date.now()),
    //     status: 'cancelled',
    //   })
    // }
    return oldTownHall.remove()
      .then(() => townHall.eventId);
  }
})

export default [
  fetchEvents,
  fetchPendingEvents,
  deleteEvent,
];