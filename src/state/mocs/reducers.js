import { GET_MOCS_SUCCESS, GET_MOCS_FAILED, ADD_CANDIDATE_FAILURE, GET_CONGRESS_BY_SESSION_SUCCESS, GET_CONGRESS_BY_SESSION_FAILED } from "./constants";
import { map } from 'lodash';

const initialState = {
  allMocIds: [],
  116: [],
  115: [],
  error: null,
};

const mocReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOCS_SUCCESS:
    console.log(action.payload.data)
      return {
        ...state,
        allMocIds: map(action.payload.data),
        error: null
      };
    case GET_MOCS_FAILED:
      console.log(`GET_MOCS_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    case ADD_CANDIDATE_FAILURE:
      console.log(`ADD_CANDIDATE_FAILURE: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    case GET_CONGRESS_BY_SESSION_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        [action.payload.key]: action.payload.ids
      }
    case GET_CONGRESS_BY_SESSION_FAILED:
    console.log(action.payload)
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default mocReducer;