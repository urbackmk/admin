import { createSelector } from 'reselect';
import {
  filter,
  find,
  map,
  includes
} from 'lodash';

export const getAllRsvps = state => state.rsvps.allRsvps;
export const getAllEventsWithRsvps = state => state.rsvps.allEventsWithRsvps;

export const getAllEventIds = createSelector([getAllEventsWithRsvps], allEvents => map(allEvents, 'eventId'))

export const getAllCurrentRsvps = createSelector(
  [getAllRsvps, getAllEventIds, getAllEventsWithRsvps], 
    (allRsvps, allIds, allEvents) => {
    return map(filter(allRsvps, (rsvp) => includes(allIds, rsvp.eventId)), filteredRsvp => {
        const event = find(allEvents, (event) => event.eventId === filteredRsvp.eventId)
          return {
            ...filteredRsvp,
            title: `${event.displayName} ${event.party} ${event.district ? `${event.state}-${event.district}`: event.state}`,
            time: event.Time,
            date: event.dateString,
            location: event.Location ? `${event.Location} ${event.address}` : `${event.address}`,
          }
        })
    });

export const getAllCurrentRsvpsForCsv = createSelector([getAllCurrentRsvps], (allCurrent) => {
  return map(allCurrent, currentRsvp => {
    const toReturn = {
      ...currentRsvp,
      ...currentRsvp.can_contact
    }
    delete toReturn.can_contact;
    return toReturn;
  });
})

export const getAllRsvpsForCsv = createSelector([getAllRsvps], (allCurrent) => {
  return map(allCurrent, currentRsvp => {
    const toReturn = {
      ...currentRsvp,
      ...currentRsvp.can_contact
    }
    delete toReturn.can_contact;
    return toReturn;
  });
})