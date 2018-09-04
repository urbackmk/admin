import { createLogic } from "redux-logic"
import { firebaseUrl } from '../constants';
import { GET_EVENTS, GET_EVENTS_SUCCESS, GET_EVENTS_FAILED } from "./actions";

const fetchEvents = createLogic({
  type: GET_EVENTS,
  processOptions: {
    successType: GET_EVENTS_SUCCESS,
    failType: GET_EVENTS_FAILED,
  },
  process() {
    return httpClient.get(`${firebaseUrl}/townHalls.json`)
      .then((events) => events)
      .catch((err) => err);
  }
});

export default fetchEvents;