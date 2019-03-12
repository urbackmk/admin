import { createSelector } from 'reselect';
import {
  includes,
  filter,
  map, 
  reduce,
} from 'lodash';

import { 
  LIVE_EVENTS_TAB, 
  PENDING_EVENTS_TAB, 
  STATES_LEGS 
} from '../../constants';
import { getAllOldEventsAsList, getAllEvents, getAllEventsAsList } from '../events/selectors';

export const getPendingOrLiveTab = state => state.selections.selectedEventTab;
export const getActiveFederalOrState = state => state.selections.federalOrState;
export const getMode = state => state.selections.mode;
export const getCurrentHashLocation = state => state.selections.currentHashLocation;
export const getOldEventsActiveFederalOrState = state => state.selections.federalOrStateOldEvents;
export const getDateRange = state => state.selections.dateLookupRange;
export const getStatesToFilterArchiveBy = state => state.selections.filterByState;
export const includeLiveEventsInLookup = state => state.selections.includeLiveEvents;

export const getLiveEventUrl = createSelector([getActiveFederalOrState], (federalOrState) => {
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_townhalls/${federalOrState}`;
  }
  return 'townHalls';
});

export const getSubmissionUrl = createSelector([getActiveFederalOrState], (federalOrState) => {
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_legislators_user_submission/${federalOrState}`;
  }
  return 'UserSubmission';
});

export const getArchiveUrl = createSelector([getActiveFederalOrState], (federalOrState) => {
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_townhalls_archive/${federalOrState}`;
  }
  return 'archive_clean';
});

export const getEventsToShowUrl = createSelector([getPendingOrLiveTab, getSubmissionUrl, getLiveEventUrl], 
    (liveOrPending, submissionUrl, liveEventUrl) => {
    if (liveOrPending === LIVE_EVENTS_TAB) {
        return liveEventUrl
    } else if (liveOrPending === PENDING_EVENTS_TAB) {
        return submissionUrl
    }
    return null;
});

export const getPeopleNameUrl = createSelector([getActiveFederalOrState, getMode], (federalOrState, mode) => {
  if (mode === 'candidate') {
    return 'candidate_keys';
  }
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_legislators_id/${federalOrState}`;
  }
  return 'mocID';
});

export const getPeopleDataUrl = createSelector([getActiveFederalOrState, getMode], (federalOrState, mode) => {
  if (mode === 'candidate') {
    return 'candidate_data';
  }
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_legislators_data/${federalOrState}`;
  }
  return 'mocData';
});

export const getFilteredArchivedEvents = createSelector(
  [
    includeLiveEventsInLookup, 
    getStatesToFilterArchiveBy, 
    getAllOldEventsAsList, 
    getAllEventsAsList
  ], 
  (includeLive, states, oldEvents, liveEvents) => {
    const allEvents = includeLive ? [...oldEvents, ...liveEvents] : oldEvents;
    if (!states.length) {
      return allEvents;
    }
    return filter(allEvents, (event) => {
      return includes(states, event.state);
    })
});

export const getDataForArchiveChart = createSelector(
  [getFilteredArchivedEvents],
  (allEvents) => {
    if (!allEvents) {
      return [];
    }
    return map(reduce(allEvents, (acc, cur) => {
      const party = cur.Party || false;
      if (acc[party] >= 0) {
        acc[party] = acc[party] + 1;
      }
      return acc;
    }, {
      D: 0,
      R: 0,
      I: 0,
    }), (value, key) => {
      return {
        party: key,
        value
      }
    })
  }
)