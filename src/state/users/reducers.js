import {
  map,
} from 'lodash';

import { 
  GET_USERS_SUCCESS, 
  RECEIVE_USER, 
  UPDATE_USER_MOCS,
  REMOVE_ASSIGNMENT_SUCCESS,
  ASSIGN_MOC_TO_USER_SUCCESS,
  ADD_AND_ASSIGN_TO_USER_SUCCESS,
  USER_REQUEST_FAILED,
  SUBMIT_REQUEST_ACCESS_SUCCESS,
} from "./constants";

const initialState = {
  allResearchedMocs: [],
  allResearchers: [],
  error: null,
  user: {},
};

const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        allResearchers: payload,
        error: null
      };
    case USER_REQUEST_FAILED:
      console.log(`REQUEST_FAILED: ${payload}`);
      return {
        ...state,
        error: payload
      };
    case UPDATE_USER_MOCS:
      return {
        ...state,
        allResearchedMocs: [...state.allResearchedMocs, ...payload.mocList]
      }
    case RECEIVE_USER: 
      return {
        ...state, 
        error: null,
        user: payload,
      }
    case REMOVE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        allResearchers: map(state.allResearchers, researcher => {
          if (researcher.id === payload.userId) {
            return {
              ...researcher,
              mocs: {
                ...researcher.mocs,
                [payload.mocId]: {
                  ...researcher.mocs[payload.mocId],
                  isAssigned: false,
                }
              }
            }
          }
          return researcher;
        })
      }
      case ASSIGN_MOC_TO_USER_SUCCESS:
      return {
        ...state,
        allResearchers: map(state.allResearchers, researcher => {
          if (researcher.id === payload.userId) {
            return {
              ...researcher,
              mocs: {
                ...researcher.mocs,
                [payload.mocId]: {
                  ...researcher.mocs[payload.mocId],
                  isAssigned: true,
                }
              }
            }
          }
          return researcher;
        })
      }
      case SUBMIT_REQUEST_ACCESS_SUCCESS: 
         return {
           ...state,
           error: null,
           user: {
             ...state.user,
             requestedAccess: true,
           },
         }
      case ADD_AND_ASSIGN_TO_USER_SUCCESS:
        return {
          ...state,
          allResearchedMocs: [...state.allResearchedMocs, payload],
          allResearchers: map(state.allResearchers, researcher => {
            if (researcher.id === payload.userId) {
              return {
                ...researcher,
                mocs: {
                  ...researcher.mocs,
                  [payload.id]: {
                    id: payload.id,
                    id_key: payload.id_key,
                    isAssigned: true,
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