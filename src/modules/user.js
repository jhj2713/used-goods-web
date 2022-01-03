import { handleActions, createAction } from "redux-actions";
import * as userAPI from "../lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("user/SIGNUP");
const [CHECK_NAME, CHECK_NAME_SUCCESS, CHECK_NAME_FAILURE] =
  createRequestActionTypes("user/CHECK_NAME");
const [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE] =
  createRequestActionTypes("user/LOAD_USER");
const LOGOUT = "user/LOGOUT";

export const login = createRequestThunk(LOGIN, userAPI.login);
export const signup = createRequestThunk(SIGNUP, userAPI.signup);
export const checkName = createRequestThunk(CHECK_NAME, userAPI.checkName);
export const loadUser = createRequestThunk(LOAD_USER, userAPI.loadUser);
export const logout = createAction(LOGOUT);

const initialState = {
  user: null,
  double: null,
  doubleCheck: null,
  otherUser: null,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error,
    }),
    [CHECK_NAME_SUCCESS]: (state, { payload: doubleCheck }) => ({
      ...state,
      doubleCheck,
      error: null,
    }),
    [CHECK_NAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      doubleCheck: null,
      error,
    }),
    [SIGNUP_SUCCESS]: (state, { payload: signupSuccess }) => ({
      ...state,
      signupSuccess,
      error: null,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      signupSuccess: null,
      error,
    }),
    [LOAD_USER_SUCCESS]: (state, { payload: otherUser }) => ({
      ...state,
      otherUser,
      error: null,
    }),
    [LOAD_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      otherUser: null,
      error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
