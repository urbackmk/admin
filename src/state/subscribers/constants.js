import { makeConstant } from "../../utils";

const STATE_BRANCH = "SUBSCRIBERS";

export const REQUEST_FAILED = makeConstant(STATE_BRANCH, 'REQUEST_FAILED');
export const SUBMIT_SUBSCRIBER_SUCCESS = makeConstant(STATE_BRANCH, 'SUBMIT_SUBSCRIBER_SUCCESS');
export const SUBMIT_SUBSCRIBER = makeConstant(STATE_BRANCH, 'SUBMIT_SUBSCRIBER');