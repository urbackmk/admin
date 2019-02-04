import { createSelector } from 'reselect';
import { map } from 'lodash';

export const getAllEvents = state => state.events.allEvents;
export const allEventsAsList = createSelector([getAllEvents], (allEvents) => {
    return map(allEvents);
})