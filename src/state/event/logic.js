import { createLogic } from "redux-logic"
import { GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILED } from "./actions";

const fetchEvents = createLogic({
  type: GET_EVENTS,
  processOptions: {
    successType: GET_EVENTS_SUCCESS,
    failType: GET_EVENTS_FAILED,
  },
  process(deps) {
    return deps.httpClient.get(`${deps.firebaseUrl}/townHalls.json`);
  }
});

export default [
  fetchEvents,
];