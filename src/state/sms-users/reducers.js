import { 
  RECEIVE_TOTAL_USERS,
  REQUEST_FAILED,
  RECEIVE_SMS_CACHE,
  SENT_MESSAGE,
} from "./constants";
import { map } from "lodash";

const initialState = {
  totalSmsUsers: 0,
  userCache: [],
  error: null,
};

const smsUserReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case RECEIVE_TOTAL_USERS:
      return {
        ...state,
        totalSmsUsers: payload,
        error: null,
      };
    case REQUEST_FAILED:
        console.log(`SMS_USER_REQUEST_FAILED: ${payload}`);
        return {
          ...state,
          error: payload
        };
    case RECEIVE_SMS_CACHE: 
    console.log(payload)
        return {
          ...state,
          userCache: payload,
          error: null,
        }
    case SENT_MESSAGE: 
        return {
          ...state,
          userCache: map(state.userCache, (user) => user.phoneNumber === payload.sentTo ? {
            ...user,
            messages: [...user.messages, payload.message]
          } : user)
        };
    default:
      return state;
  }
};

export default smsUserReducer;