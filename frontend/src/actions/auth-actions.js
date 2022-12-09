import * as auth from "../services/auth-service";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_PROFILE = "GET_PROFILE";

export const registerUser = async (dispatch, user) => {
  const registeredUser = await auth.register(user);
  dispatch({
    type: REGISTER_USER,
    registeredUser,
  });
};

export const loginUser = async (dispatch, user) => {
  const loggedInUser = await auth.login(user);
  dispatch({
    type: LOGIN_USER,
    loggedInUser,
  });
};

export const logoutUser = async (dispatch, user) => {
  const loggedOutUser = await auth.logout(user);
  dispatch({
    type: LOGOUT_USER,
    loggedOutUser,
  });
};

export const getProfile = async (dispatch) => {
  const profile = await auth.profile();
  dispatch({
    type: GET_PROFILE,
    profile,
  });
};
