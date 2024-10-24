import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actiontype";

// Get user and token from localStorage, or set to defaults
const user = JSON.parse(localStorage.getItem("user")) || {};
const token = localStorage.getItem("token") || "";

// Set initialState with correct auth based on token presence
const initialState = {
  isLoading: false,
  isError: false,
  auth: !!token, // Set auth to true if token exists, false otherwise
  user: user,
  token: token,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
      return { ...state, isLoading: true, isError: false }; // Set isError to false on request

    case SIGNUP_SUCCESS:
      return { ...state, isLoading: false, user: payload.user, isError: false }; // Set isError to false on success

    case SIGNUP_FAILURE:
      return { ...state, isLoading: false, isError: true, error: payload }; // Set isError to true on failure

    case LOGIN_REQUEST:
      return { ...state, isLoading: true, isError: false }; // Set isError to false on request

    case LOGIN_SUCCESS:
      // Save user and token in localStorage
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);

      // Update state with auth, token, and user info
      return {
        ...state,
        isLoading: false,
        auth: true, // Set auth to true on successful login
        token: payload.token, // Set token from payload
        user: payload.user, // Set user from payload
        isError: false, // Reset error flag
      };

    case LOGIN_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case LOGOUT_SUCESS:
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return { ...state, auth: false, token: "", user: {}, isError: false };

    default:
      return state;
  }
};
