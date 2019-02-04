import { createSelector } from 'reselect';

export const getAllEvents = state => state.events.allEvents;
export const getAllPendingEvents = state => state.events.allPendingEvents;