import {
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_REQUEST_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const getUser = (paramobj, token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get(`https://chat-app-xsx0.onrender.com/api/user/all-users`, config)
    .then((res) => {
      console.log(res, "res");
      dispatch({ type: USER_REQUEST_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      dispatch({ type: USER_REQUEST_FAILURE });
    });
};
