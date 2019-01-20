import { createLogic } from "redux-logic"
import { 
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

export default [
  fetchEvents,
  fetchPendingEvents,
];