import {
  CHANGE_EVENTS_TAB, 
  CHANGE_FEDERAL_STATE_RADIO,
} from "./constants";

export const changeActiveEventTab = tab => ({
  type: CHANGE_EVENTS_TAB,
  payload: tab
});

export const changeFederalStateRadio = value => ({
  type: CHANGE_FEDERAL_STATE_RADIO,
  payload: value
});

