import {
  filter,
  map,
} from 'lodash';

import { 
  GET_USERS_SUCCESS, 
  GET_USERS_FAILED, 
  RECEIVE_USER, 
  UPDATE_USER_MOCS,
} from "./constants";

const initialState = {
  allResearchers: [],
  allResearchedMocs: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        allResearchers: action.payload,
        error: null
      };
    case GET_USERS_FAILED:
      console.log(`GET_USERS_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_USER_MOCS:
      return {
        ...state,
        allResearchedMocs: [...state.allResearchedMocs, action.payload.mocData]
      }
    case RECEIVE_USER: 
      return {
        ...state, 
        user: action.payload,
        error: null
      }
    default:
      return state;
  }
};

export default userReducer;