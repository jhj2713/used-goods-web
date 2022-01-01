import { handleActions, createAction } from "redux-actions";
import * as userAPI from "../lib/api/user";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("user/LOGIN");
const LOGOUT = "user/LOGOUT";

export const login = createRequestThunk(LOGIN, userAPI.login);
export const logout = createAction(LOGOUT);

const initialState = {
  user: null,
  double: null,
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
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
