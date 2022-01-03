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
const [PAGINATION_BOARD, PAGINATION_BOARD_SUCCESS, PAGINATION_BOARD_FAILURE] =
  createRequestActionTypes("community/PAGINATION_BOARD");

export const loadBoards = createRequestThunk(LOAD, comAPI.loadBoards);
export const saveBoard = createRequestThunk(SAVE, comAPI.saveBoard);
export const updateBoard = createRequestThunk(UPDATE, comAPI.updateBoard);
export const deleteBoard = createRequestThunk(DELETE, comAPI.deleteBoard);
export const paginationNextBoard = createRequestThunk(
  PAGINATION_BOARD,
  comAPI.paginationNextBoard,
);

const initialState = {
  boards: null,
  lastDoc: null,
  save: null,
  deleteBoard: null,
  isLast: null,
};

export default handleActions(
  {
    [LOAD_SUCCESS]: (state, { payload: doc }) => ({
      ...state,
      boards: doc.boards,
      lastDoc: doc.lastDoc,
      isLast: doc.isLast,
      error: null,
    }),
    [LOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boards: null,
      lastDoc: null,
      isLast: null,
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
    [PAGINATION_BOARD_SUCCESS]: (state, { payload: docs }) => ({
      ...state,
      boards: docs.boards,
      lastDoc: docs.lastDoc,
      isLast: docs.isEmpty,
      error: null,
    }),
    [PAGINATION_BOARD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boards: null,
      lastDoc: null,
      isLast: null,
      error,
    }),
  },
  initialState,
);
