import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actiontype";

const initialState = {
  isLoading: false,
  isError: false,
  auth: false,
  user: {},
  token: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
      return { ...state, isLoading: true, isError: false }; // Set isError to false on request
    case SIGNUP_SUCCESS:
      return { ...state, isLoading: false, user: payload.user, isError: false }; // Set isError to false on success
    case SIGNUP_FAILURE:
      return { ...state, isLoading: false, isError: true, error: payload }; // Use payload directly
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, isError: false }; // Set isError to false on request
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        auth: true,
        token: payload.token,
        user: payload.user,
        isError: false,
      };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, isError: true }; // Keep isError true on failure
    case LOGOUT_SUCESS:
      return { ...state, auth: false, token: "", user: {}, isError: false }; // Clear user data and reset isError
    default:
      return state;
  }
};
