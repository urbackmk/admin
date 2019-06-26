import {
  REQUEST_FAILED,
  SUBMIT_SUBSCRIBER_SUCCESS,
  EDIT_SUBSCRIBER_SUCCESS,
  REQUEST_ALL_SUBSCRIBERS_SUCCESS,
  GET_EDIT_SUBSCRIBER,
} from './constants';

const initialState = {
  error: null,
  allSubscribers: [],
  editSubscriber: {},
};

const subscriberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        error: null,
        allSubscribers: [...state.allSubscribers, payload],
      }
    case EDIT_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        error: null,
        allSubscribers: state.allSubscribers.map((person) => {
          if (person.key === payload.key) {
            return payload;
          }
          return person;
        }),
      }
    case REQUEST_ALL_SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        error: null,
        allSubscribers: payload,
      }
    case GET_EDIT_SUBSCRIBER:
      return {
        ...state,
        editSubscriber: state.allSubscribers.find((subscriber) => {
          return subscriber.email === payload;
        }),
      }
    case REQUEST_FAILED:
      console.log(payload)
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
};

export default subscriberReducer;