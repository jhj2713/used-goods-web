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
const LOGOUT = "user/LOGOUT";

export const login = createRequestThunk(LOGIN, userAPI.login);
export const signup = createRequestThunk(SIGNUP, userAPI.signup);
export const checkName = createRequestThunk(CHECK_NAME, userAPI.checkName);
export const logout = createAction(LOGOUT);

const initialState = {
  user: null,
  double: null,
  doubleCheck: null,
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
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
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
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
