import { createSelector } from 'reselect';

export const getEditSubscriber = (state) => state.subscribers.editSubscriber;
export const getSubscriberEmails = (state) => {
    return state.subscribers.allSubscribers.map((subscriber) => {
        return subscriber.email;
    });
}
export const getSubmitButtonText = (state) => state.subscribers.submitButtonText;