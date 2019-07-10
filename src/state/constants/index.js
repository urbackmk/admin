import {
    PENDING_EVENTS_TAB,
    LIVE_EVENTS_TAB,
    ARCHIVED_EVENTS_TAB,
} from '../../constants'

export const firebaseUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_DATABASE_URL : process.env.REACT_APP_TESTING_DATABASE_URL;
export const stateLegislatorsData = 'state_legislators_data';
export const stateLegislatorsId = 'state_legislators_id';
export const candidateData = 'candidate_data';
export const candidateKeys = 'candidate_keys';
export const EVENTS_PATHS = {
    [PENDING_EVENTS_TAB]: {
        FEDERAL: 'UserSubmission',
        STATE: 'state_legislators_user_submission'},
    [LIVE_EVENTS_TAB]: {
        FEDERAL: 'townHalls',
        STATE: 'state_townhalls'},
    [ARCHIVED_EVENTS_TAB]: {
        FEDERAL: 'archived_town_halls',
        STATE: 'archived_state_town_halls'},
};
export const FEDERAL_KEY = 'federal';
export const eventsPathsReverse = {
    'UserSubmission': FEDERAL_KEY,
    'townHalls': FEDERAL_KEY,
    'archived_town_halls': FEDERAL_KEY,
};