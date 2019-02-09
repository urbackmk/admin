import {
  filter,
  map,
} from 'lodash';

import { 
  GET_USERS_SUCCESS, 
  GET_USERS_FAILED, 
  RECEIVE_USER, 
  UPDATE_USER_MOCS,
  REMOVE_ASSIGNMENT_SUCCESS,
  REQUEST_FAILED,
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
    case REQUEST_FAILED:
      console.log(`REQUEST_FAILED: ${action.payload}`);
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
    case REMOVE_ASSIGNMENT_SUCCESS:
    console.log('remove', action)
      return {
        ...state,
        allResearchers: map(state.allResearchers, researcher => {
          if (researcher.id === action.payload.userId) {
            return {
              ...researcher,
              mocs: {
                ...researcher.mocs,
                [action.payload.mocId]: {
                  ...researcher.mocs[action.payload.mocId],
                  isAssigned: false,
                }
              }
            }
          }
          return researcher;
        })
      }

    default:
      return state;
  }
};

export default userReducer;