import {
  map,
} from 'lodash';

import { 
  GET_USERS_SUCCESS, 
  RECEIVE_USER, 
  UPDATE_USER_MOCS,
  REMOVE_ASSIGNMENT_SUCCESS,
  REQUEST_FAILED,
  ASSIGN_MOC_TO_USER_SUCCESS,
  ADD_AND_ASSIGN_TO_USER_SUCCESS,
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
      console.log(action.payload)
        return {
          ...state,
          allResearchedMocs: [...state.allResearchedMocs, {
            name: action.payload.mocName,
            govtrack_id: action.payload.mocId,
            userId: action.payload.userId,
          }],
          allResearchers: map(state.allResearchers, researcher => {
            if (researcher.id === action.payload.userId) {
              return {
                ...researcher,
                mocs: {
                  ...researcher.mocs,
                  [action.payload.mocId]: {
                    govtrack_id: action.payload.mocId,
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