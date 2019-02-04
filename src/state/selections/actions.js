import {
  CHANGE_EVENTS_TAB,
} from "./constants";

export const changeActiveEventTab = tab => ({
  type: CHANGE_EVENTS_TAB,
  payload: tab
});
