import { GET_USERS_SUCCESS, GET_USERS_FAILED, RECEIVE_USER } from "./actions";

const initialState = {
  allUsers: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.data,
        error: null
      };
    case GET_USERS_FAILED:
      console.log(`GET_USERS_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    case RECEIVE_USER: 
      console.log(action.payload)
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