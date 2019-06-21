import {
    REQUEST_FAILED,
    SUBMIT_SUBSCRIBER_SUCCESS,
    REQUEST_ALL_SUBSCRIBERS_SUCCESS,
    UPDATE_EMAIL_DATA,
} from './constants';

const initialState = {
    error: null,
    allSubscribers: [],
    emailDataSource: [],
    submitText: 'Add New',
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
        case UPDATE_EMAIL_DATA:
            const emails = state.allSubscribers.reduce((acc, curr) => {
                if (curr.email.includes(payload)) acc.push(curr.email);
                return acc;
            }, []);
            return {
                ...state,
                emailDataSource: emails,
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