import { createLogic } from "redux-logic"
import {
  concat,
  filter,
} from "lodash";

import { 
  REQUEST_ALL_RSVPS, 
  RSVP_REQUEST_FAILED, 
  REQUEST_ALL_EVENTS_WITH_RSVPS_SUCCESS,
  REQUEST_ALL_EVENTS_WITH_RSVPS
} from "./constants";
import { requestAllEventsWithRSVPs, receiveRsvps } from "./actions";

const getAllEventDataWithRsvpsLogic = createLogic({
     process({ action }) {
        return Promise.all(action.payload)
               .then((snapshotList) => {
                   return concat(snapshotList)
                 }).then((snapshot) => {
                   const toReturn = [];
                    snapshot.forEach(eventSnap => {
                      toReturn.push(eventSnap.val())
                    })
                    return filter(toReturn);
                 })
      },
      processOptions: {
        failType: RSVP_REQUEST_FAILED,
        successType: REQUEST_ALL_EVENTS_WITH_RSVPS_SUCCESS,
      },
      type: REQUEST_ALL_EVENTS_WITH_RSVPS,
})

const requestPendingUsersLogic = createLogic({
     process({ firebasedb, action }, dispatch, done) {
      return firebasedb.ref('rsvps').once('value')
        .then(snapshot => {
          const allRsvps = [];
          const allEventPromises = [];
          snapshot.forEach(eventKey => {
            allEventPromises.push(firebasedb.ref(`townHalls/${eventKey.key}`).once('value'))
            eventKey.forEach(rvspSnap => {
              allRsvps.push(rvspSnap.val())
            })
          })
          dispatch(requestAllEventsWithRSVPs(allEventPromises));
          dispatch(receiveRsvps(allRsvps));
        })
    },
  type: REQUEST_ALL_RSVPS,
});

export default [
  requestPendingUsersLogic,
  getAllEventDataWithRsvpsLogic,
];