import { createSelector } from 'reselect';
import { map } from 'lodash';
import {
  getAllEvents,
  getAllPendingEvents,
} from '../events/selectors';
import { LIVE_EVENTS_TAB, PENDING_EVENTS_TAB, ARCHIVED_EVENTS_TAB } from '../../constants';

export const getActiveEventTab = state => state.selections.selectedEventTab;

export const getEventsForTab = createSelector([getActiveEventTab, getAllEvents, getAllPendingEvents], 
    (activeTab, liveEvents, pendingEvents) => {
        const mapping = {
            [LIVE_EVENTS_TAB]: map(liveEvents),
            [PENDING_EVENTS_TAB]: map(pendingEvents),
            [ARCHIVED_EVENTS_TAB]: [],
        }
        console.log(activeTab, mapping[activeTab])
        return mapping[activeTab];
})