import { createSelector } from 'reselect';

export const getAllEvents = state => state.event.allEvents;
export const getAllPendingEvents = state => state.event.allPendingEvents;
