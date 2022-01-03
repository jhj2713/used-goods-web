import { handleActions } from "redux-actions";
import * as comAPI from "../lib/api/community";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOAD, LOAD_SUCCESS, LOAD_FAILURE] =
  createRequestActionTypes("community/LOAD");

export const load = createRequestThunk(LOAD, comAPI.load);

const initialState = {
  boards: null,
};

export default handleActions(
  {
    [LOAD_SUCCESS]: (state, { payload: boards }) => ({
      ...state,
      boards,
      error: null,
    }),
    [LOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boards: null,
      error,
    }),
  },
  initialState,
);
