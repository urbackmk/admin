import { createLogic } from "redux-logic"
import moment from 'moment';
import { 
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  REQUEST_EVENTS, 
  REQUEST_EVENTS_SUCCESS, 
  REQUEST_EVENTS_FAILED,
  REQUEST_OLD_EVENTS_SUCCESS,
  ARCHIVE_EVENT_SUCCESS,
  ARCHIVE_EVENT,
  APPROVE_EVENT,
  APPROVE_EVENT_SUCCESS,
  APPROVE_EVENT_FAIL,
  REQUEST_OLD_EVENTS,
} from "./constants";

const fetchEvents = createLogic({
  type: REQUEST_EVENTS,
  processOptions: {
    successType: REQUEST_EVENTS_SUCCESS,
    failType: REQUEST_EVENTS_FAILED,
  },
  process(deps) {
      const {
      action,
      firebasedb,
    } = deps;
    const { payload } = action;
    return firebasedb.ref(`${payload}`).once('value')
      .then((snapshot) => {
        const allData = [];
        snapshot.forEach((ele) => {
          allData.push(ele.val())
        })
        return allData;
      })
  }
});

const fetchOldEventsLogic = createLogic({
  type: REQUEST_OLD_EVENTS,
  processOptions: {
    successType: REQUEST_OLD_EVENTS_SUCCESS,
    failType: REQUEST_EVENTS_FAILED,
  },
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;
    const {
      payload
    } = action;
    return firebasedb.ref(`${payload}`).once('value')
      .then((snapshot) => {
        const allData = [];
        snapshot.forEach((dataKey) => {
          dataKey.forEach((ele) => {
            console.log(ele.val())
            allData.push(ele.val())
          })
        })
        return allData;
      })
  }
});

const approveEventLogic = createLogic({
  type: APPROVE_EVENT,
  processOptions: {
    successType: APPROVE_EVENT_SUCCESS,
    failType: APPROVE_EVENT_FAIL,
  },
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;

    const {
      townHall,
      path,
      livePath,
    } = action.payload;
    console.log(livePath)
    return firebasedb.ref(`${livePath}/${townHall.eventId}`).update(townHall)
      .then(() => {
        const approvedTownHall = firebasedb.ref(`${path}/${townHall.eventId}`);
        return approvedTownHall.remove()
          .then(() => {
            return townHall.eventId;
          })
      })
  }
});
const archiveEventLogic = createLogic({
  type: ARCHIVE_EVENT,
  processOptions: {
    successType: ARCHIVE_EVENT_SUCCESS,
  },
  process(deps) {
      const {
        action,
        firebasedb,
      } = deps;

      const {
        townHall,
        path,
        archivePath
      } = action.payload;
      const oldTownHall = firebasedb.ref(`${path}/${townHall.eventId}`);
      const oldTownHallID = firebasedb.ref(`/townHallIds/${townHall.eventId}`);
      const dateKey = townHall.dateObj ? moment(townHall.dateObj).format('YYYY-MM') : 'no_date';
      console.log(`${archivePath}/${dateKey}/${townHall.eventId}`)
      return firebasedb.ref(`${archivePath}/${dateKey}/${townHall.eventId}`).update(townHall)
        .then(() => {
            const removed = oldTownHall.remove();
            if (removed) {
              oldTownHallID.remove()
              return townHall.eventId;
            }
        })
        .catch(e => {
          console.log(e)
        })
      }
})

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
    const oldTownHall = firebasedb.ref(`${path}/${townHall.eventId}`);
    if (path === 'townHalls') {
      firebasedb.ref(`/townHallIds/${townHall.eventId}`).update({
        eventId: townHall.eventId,
        lastUpdated: (Date.now()),
        status: 'cancelled',
      })
    }
    return oldTownHall.remove()
      .then(() => townHall.eventId);
  }
})

export default [
  archiveEventLogic,
  approveEventLogic,
  fetchOldEventsLogic,
  fetchEvents,
  deleteEvent,
];