import {
  CHANGE_EVENTS_TAB, 
  CHANGE_FEDERAL_STATE_RADIO,
  GET_URL_HASH,
  CHANGE_DATE_LOOKUP,
  CHANGE_STATE_FILTERS,
  TOGGLE_INCLUDE_LIVE_EVENTS,
} from "./constants";

export const changeActiveEventTab = tab => ({
  type: CHANGE_EVENTS_TAB,
  payload: tab
});

export const changeFederalStateRadio = value => ({
  type: CHANGE_FEDERAL_STATE_RADIO,
  payload: value
});

export const getHashLocationAndSave = () => ({
  type: GET_URL_HASH,
});

export const changeDateLookup = (dates) => ({
  type: CHANGE_DATE_LOOKUP,
  payload: dates,
});

export const changeStateFilters = (states) => ({
  type: CHANGE_STATE_FILTERS,
  payload: states,
});

export const toggleIncludeLiveEventsInLookup = (include) => ({
  type: TOGGLE_INCLUDE_LIVE_EVENTS,
  payload: include,
});