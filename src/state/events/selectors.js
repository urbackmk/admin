import { createSelector } from 'reselect';
import {
  find, 
  map,
  filter,
  includes,
} from 'lodash';
import { getAllResearchers } from '../researchers/selectors';

export const getAllEvents = state => state.events.allEvents;
export const getAllOldEvents = state => state.events.allOldEvents;
export const getLoading = state => state.events.loading;
export const getEventsCounts = state => state.events.eventsCounts;

export const getFederalEventCount = createSelector([getEventsCounts], (eventCount) => {
  return eventCount.federal;
})

export const getStateEventCount = createSelector([getEventsCounts], (eventCount) => {
  delete eventCount.federal
  return eventCount;
})

export const getAllOldEventsWithUserEmails = createSelector([getAllOldEvents, getAllResearchers], (oldEvents, researchers) => {
  return map(oldEvents, event => {
    const user = find(researchers, { uid: event.enteredBy}) || find(researchers, { email: event.enteredBy });
    return {
      ...event,
      enteredBy: user ? user.email : event.enteredBy
    }
  })
})

export const getEmailCoverage = createSelector([getAllOldEventsWithUserEmails], (oldEvents) => {
  const finished = filter(oldEvents, event => includes(event.enteredBy, '@'));
  const total = filter(oldEvents, event => event.enteredBy);
  return finished.length / total.length * 100;
});

export const getAllEventsAsList = createSelector([getAllEvents, getAllResearchers], (allEvents, researchers) => {
      return map(allEvents, event => {
      const user = find(researchers, { uid: event.enteredBy}) || find(researchers, { email: event.enteredBy });
        return {
          ...event,
          enteredBy: user? user.email : event.enteredBy
        }
      })
})
