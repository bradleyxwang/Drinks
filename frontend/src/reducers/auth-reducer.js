import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_PROFILE,
} from "../actions/auth-actions";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: action.user };
    case LOGIN_USER:
      return { ...state, user: action.user };
    case LOGOUT_USER:
      delete state.user;
      delete state.profile;
      return state;
    case GET_PROFILE:
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};
export default authReducer;
