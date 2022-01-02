import { handleActions, createAction } from "redux-actions";
import * as userAPI from "../lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes("user/SIGNUP");
const [CHECK_EMAIL, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE] =
  createRequestActionTypes("user/CHECK_EMAIL");
const LOGOUT = "user/LOGOUT";

export const login = createRequestThunk(LOGIN, userAPI.login);
export const checkEmail = createRequestThunk(
  CHECK_EMAIL,
  userAPI.doublecheckEmail,
);
export const signup = createRequestThunk(SIGNUP, userAPI.signup);
export const logout = createAction(LOGOUT);

const initialState = {
  user: null,
  double: null,
  checkEmail: null,
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
    [CHECK_EMAIL_SUCCESS]: (state, { payload: checkEmail }) => ({
      ...state,
      checkEmail,
      error: null,
    }),
    [CHECK_EMAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      checkEmail: null,
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
