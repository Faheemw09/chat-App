import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./actiontype";

// Login Action
export const SignIn = (obj, navigate) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`https://chatap-iqxt.onrender.com/api/user/user-signin`, obj)
    .then((res) => {
      console.log(res, "res");
      const { token, user } = res.data;
      console.log({ token, user }, "login");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, payload: { token, user, auth: true } });
      navigate("/home");
    })
    .catch((err) => {
      console.log("errrrrrrrrr", err);
      const errorMessage = err.response?.data?.msg;
      dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
      throw new Error(errorMessage);
    });
};

// Sign-Up Action
export const SignUp = (obj, navigate) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const response = await axios.post(
      `https://chatap-iqxt.onrender.com/api/user/user-signup`,
      obj
    ); // Use your own API endpoint
    const { user } = response.data;
    console.log({ user });
    dispatch({ type: SIGNUP_SUCCESS, payload: { user } });
    navigate("/login");
  } catch (err) {
    console.log("errrrrrrrrr", err.response.data.message);
    const errorMessage = err.response?.data?.message;

    dispatch({
      type: SIGNUP_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Logout Action

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });

  return axios
    .post(`https://your-api-endpoint/logout`) // Call the logout API
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_FAILURE });
    });
};
