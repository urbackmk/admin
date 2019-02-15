import {
  CHANGE_EVENTS_TAB, 
  CHANGE_FEDERAL_STATE_RADIO,
  GET_URL_HASH,
  CHANGE_FEDERAL_STATE_RADIO_OLD_EVENT,
} from "./constants";

export const changeActiveEventTab = tab => ({
  type: CHANGE_EVENTS_TAB,
  payload: tab
});

export const changeFederalStateRadio = value => ({
  type: CHANGE_FEDERAL_STATE_RADIO,
  payload: value
});

export const changeOldEventsLookupFederalState = value => ({
  type: CHANGE_FEDERAL_STATE_RADIO_OLD_EVENT,
  payload: value
});

export const getHashLocationAndSave = () => ({
  type: GET_URL_HASH,
})