import {
    REQUEST_FAILED,
    SUBMIT_SUBSCRIBER_SUCCESS,
    REQUEST_ALL_SUBSCRIBERS_SUCCESS,
    REQUEST_EDIT_SUBSCRIBER,
    UPDATE_SUBMIT_BUTTON_TEXT,
} from './constants';

const initialState = {
    error: null,
    allSubscribers: [],
    editSubscriber: {},
    submitButtonText: 'Add New',
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
        case REQUEST_EDIT_SUBSCRIBER:
            const matchSubscriber = state.allSubscribers.find((subscriber) => {
                return subscriber.email === payload;
            });
            return {
                ...state,
                editSubscriber: {
                    name: matchSubscriber.name,
                    districts: matchSubscriber.districts,
                    key: matchSubscriber.key,
                },
            }
        case UPDATE_SUBMIT_BUTTON_TEXT:
            return {
                ...state,
                submitButtonText: payload,
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