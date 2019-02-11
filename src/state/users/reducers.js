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
    case USER_REQUEST_FAILED:
      console.log(`REQUEST_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_USER_MOCS:
      return {
        ...state,
        allResearchedMocs: [...state.allResearchedMocs, ...action.payload.mocList]
      }
    case RECEIVE_USER: 
      return {
        ...state, 
        user: action.payload,
        error: null
      }
    case REMOVE_ASSIGNMENT_SUCCESS:
    console.log(action.payload)
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
      case ASSIGN_MOC_TO_USER_SUCCESS:
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
                  isAssigned: true,
                }
              }
            }
          }
          return researcher;
        })
      }
      case ADD_AND_ASSIGN_TO_USER_SUCCESS:
        return {
          ...state,
          allResearchedMocs: [...state.allResearchedMocs, {
            name: action.payload.mocName,
            id: action.payload.mocId,
            userId: action.payload.userId,
          }],
          allResearchers: map(state.allResearchers, researcher => {
            if (researcher.id === action.payload.userId) {
              return {
                ...researcher,
                mocs: {
                  ...researcher.mocs,
                  [action.payload.mocId]: {
                    id: action.payload.mocId,
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