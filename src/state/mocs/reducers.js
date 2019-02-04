import { GET_MOCS_SUCCESS, GET_MOCS_FAILED } from "./constants";

const initialState = {
  allMocIds: null,
  error: null,
};

const mocReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOCS_SUCCESS:
    console.log(action.payload.data)
      return {
        ...state,
        allMocIds: action.payload.data,
        error: null
      };
    case GET_MOCS_FAILED:
      console.log(`GET_MOCS_FAILED: ${action.payload}`);
      return {
        ...state,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default mocReducer;