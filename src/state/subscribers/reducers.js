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
            const updateAllSubscribers = [...state.allSubscribers];
            const index = state.allSubscribers.findIndex((el) => {
                return el.key === payload.key;
            });
            if (index < 0) {
                updateAllSubscribers.push(payload);
            } else {
                updateAllSubscribers[index] = payload;
            }
            return {
                ...state, 
                error: null,
                allSubscribers: updateAllSubscribers,
            }
        case REQUEST_ALL_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                error: null,
                allSubscribers: payload,
            }
        default:
            return state;
    }
};

export default subscriberReducer;