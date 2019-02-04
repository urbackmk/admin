import { createSelector } from 'reselect';
import {
  includes,
  map
} from 'lodash';

import { LIVE_EVENTS_TAB, PENDING_EVENTS_TAB, STATES_LEGS } from '../../constants';

export const getPendingOrLiveTab = state => state.selections.selectedEventTab;
export const getActiveFederalOrState = state => state.selections.federalOrState;
export const getMode = state => state.selections.mode;

export const getEventUrl = createSelector([getPendingOrLiveTab, getActiveFederalOrState], (liveOrPending, federalOrState) => {
    if (liveOrPending === LIVE_EVENTS_TAB) {
        if (includes(STATES_LEGS, federalOrState)) {
            return `state_townhalls/${federalOrState}`;
        }
        return 'townHalls';
    } else if (liveOrPending === PENDING_EVENTS_TAB) {
        if (includes(STATES_LEGS, federalOrState)) {
        return `state_legislators_user_submission/${federalOrState}`;
        }
        return 'UserSubmissions';
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

export const getSaveUrl = createSelector([getActiveFederalOrState], (federalOrState) => {
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_legislators_user_submission/${federalOrState}`;
  }
  return 'UserSubmission';
});

export const getArchiveUrl = createSelector([getActiveFederalOrState], (federalOrState) => {
  if (includes(STATES_LEGS, federalOrState)) {
    return `state_townhalls_archive/${federalOrState}`;
  }
  return 'archive_116th_congress';
});