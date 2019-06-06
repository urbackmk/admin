import {
    REQUEST_FAILED,
    SUBMIT_SUBSCRIBER_SUCCESS,
    SUBMIT_SUBSCRIBER,
    REQUEST_ALL_SUBSCRIBERS_SUCCESS,
} from './constants';

const initialState = {
    error: null,
    subscribers: [],
};

const subscriberReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SUBMIT_SUBSCRIBER_SUCCESS:
            return {
                ...state, 
                error: null,
                newSubscriber: payload,
                subscribers: [...state.subscribers, payload]
            }
        case REQUEST_ALL_SUBSCRIBERS_SUCCESS:
            console.log(state);
            console.log(payload);
            return {
                ...state,
                subscribers: payload,
            }
        default:
            return state;
    }
};

export default subscriberReducer;