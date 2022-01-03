import { handleActions } from "redux-actions";
import * as comAPI from "../lib/api/community";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOAD, LOAD_SUCCESS, LOAD_FAILURE] =
  createRequestActionTypes("community/LOAD");
const [SAVE, SAVE_SUCCESS, SAVE_FAILURE] =
  createRequestActionTypes("community/SAVE");
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] =
  createRequestActionTypes("community/UPDATE");
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] =
  createRequestActionTypes("community/DELETE");

export const load = createRequestThunk(LOAD, comAPI.load);
export const save = createRequestThunk(SAVE, comAPI.save);
export const update = createRequestThunk(UPDATE, comAPI.update);
export const deleteBoard = createRequestThunk(DELETE, comAPI.deleteBoard);

const initialState = {
  boards: null,
  save: null,
  deleteBoard: null,
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
    [SAVE_SUCCESS]: (state, { payload: save }) => ({
      ...state,
      save,
      error: null,
    }),
    [SAVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      save: null,
      error,
    }),
    [UPDATE_SUCCESS]: (state, { payload: update }) => ({
      ...state,
      update,
      error: null,
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      update: null,
      error,
    }),
    [DELETE_SUCCESS]: (state, { payload: deleteBoard }) => ({
      ...state,
      deleteBoard,
      error: null,
    }),
    [DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      delete: null,
      error,
    }),
  },
  initialState,
);
