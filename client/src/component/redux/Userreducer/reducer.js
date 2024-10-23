import {
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_REQUEST_SUCCESS,
} from "./actionTypes";

const initialstate = {
  isLoading: false,
  isError: false,
  users: [],
};
export const reducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case USER_REQUEST_PENDING:
      return { ...state, isLoading: true };
    case USER_REQUEST_SUCCESS:
      return { ...state, isLoading: false, users: payload };
    case USER_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
