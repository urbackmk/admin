import {
    REQUEST_FAILED,
    SUBMIT_SUBSCRIBER_SUCCESS,
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS_SUCCESS,
} from './constants';

const initialState = {
    error: null,
    allSubscribers: [],
};

const subscriberReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SUBMIT_SUBSCRIBER_SUCCESS:
            return {
                ...state, 
                error: null,
                newSubscriber: payload,
                allSubscribers: [...state.allSubscribers, payload]
            }
        case REQUEST_ALL_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                allSubscribers: payload,
            }
        default:
            return state;
    }
};

export default subscriberReducer;