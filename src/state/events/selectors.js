import { createSelector } from 'reselect';
import { map } from 'lodash';

export const getAllEvents = state => state.events.allEvents;
export const getAllOldEvents = state => state.events.allOldEvents;

export const allEventsAsList = createSelector([getAllEvents], (allEvents) => {
    return map(allEvents);
})

export const allOldEventsAsList = createSelector([getAllOldEvents], (allEvents) => {
  return map(allEvents);
})