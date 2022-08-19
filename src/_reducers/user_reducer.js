import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../_actions/types";

const initialState = {
  userId: null,
  userData: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.loginSuccess, userId: action.payload.userId };
    case AUTH_USER:
      return { ...state, userId: action.payload._id, userData: action.payload };
    case LOGOUT_USER:
      return { ...state, userId: null, userData: null };
    default:
      return state;
  }
}