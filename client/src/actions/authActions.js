import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_CART_DATA,
  SET_USER_DATA,
} from "./types";

const headers = {
  headers: { Token: localStorage.getItem("jwtToken") },
};

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("users/register", userData)
    .then((res) => {
      // console.log("==post register message==");
      // console.log(res);

      if (res.data.status_code !== "200") {
        alert(res.data.result[0].message);
        return;
      } else {
        alert(
          "Successfully created the new user, Please login with email_id & password."
        );
        //history.push("/login")
        //create user role
        var user_role;
        user_role = {
          user_id: userData.email_id,
          role_id: "625ff792515c9d882c2ffef8",
        };
        // console.log("create-userrole");
        // console.log(user_role);
        axios
          .post("/userroles/", user_role)
          .then((res) => {
            //const { token } = res.data.token;
            history.push("/login");
          })
          .catch((err) => {
            // dispatch({
            //   type: GET_ERRORS,
            //   payload: err.response.data
            // })
            history.push("/login");
          });
        //
      }
    })
    .catch((err) => {
      if (err.response.data.status_code === "400") {
        alert(err.response.data.result[0].message);
        return;
      }
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      //const { token } = res.data.token;
      if (res.data.status_code !== "200") {
        alert("Sorry! Invalid credential. Please try again..");
        return;
      } else {
        let token = res.data.token;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userData", JSON.stringify(res.data.result));
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        dispatch(setUserData(res.data.result));
        callAuditApi(userData);
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

const callAuditApi = (userData) => {
  var _audits;
  _audits = {
    user_id: userData.email_id,
    action: "login",
    date_time: Date.now(),
  };
  // console.log("audit-info");
  // console.log(_audits);
  axios
    .post("/audits/", _audits)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => console.log(err));
};

export const verifyYourself = (id) => (dispatch) => {
  axios
    .get(`v1/users/verify/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const Me = () => (dispatch) => {
  axios
    .get("v1/users/me", headers)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const cartProducts = (data) => {
  return {
    type: SET_CART_DATA,
    payload: data,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userData");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(setUserData({}));
  window.location.href = "/";
};

export const getCartItems = (userId) => (dispatch) => {
  axios
    .post(`v1/cart/getusercart?userId=${userId}`)
    .then((res) => dispatch(cartProducts(res.data)))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
