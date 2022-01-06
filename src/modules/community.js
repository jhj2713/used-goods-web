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
const [LOAD_WRITE_LIST, LOAD_WRITE_LIST_SUCCESS, LOAD_WRITE_LIST_FAILURE] =
  createRequestActionTypes("community/LOAT_WRITE_LIST");
const [SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_FAILURE] =
  createRequestActionTypes("community/SAVE_COMMENT");
const [LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE] =
  createRequestActionTypes("community/LOAD_COMMENTS");
const [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE] =
  createRequestActionTypes("community/DELETE_COMMENT");

export const loadBoards = createRequestThunk(LOAD, comAPI.loadBoards);
export const saveBoard = createRequestThunk(SAVE, comAPI.saveBoard);
export const updateBoard = createRequestThunk(UPDATE, comAPI.updateBoard);
export const deleteBoard = createRequestThunk(DELETE, comAPI.deleteBoard);
export const loadWriteList = createRequestThunk(
  LOAD_WRITE_LIST,
  comAPI.loadMyWriteList,
);
export const saveComment = createRequestThunk(SAVE_COMMENT, comAPI.saveComment);
export const loadComments = createRequestThunk(
  LOAD_COMMENTS,
  comAPI.loadComments,
);
export const deleteComment = createRequestThunk(
  DELETE_COMMENT,
  comAPI.deleteComment,
);

const initialState = {
  boards: null,
  comments: null,
};

export default handleActions(
  {
    [LOAD_SUCCESS]: (state, { payload: boards }) => ({
      ...state,
      boards: boards,
      error: null,
    }),
    [LOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boards: null,
      error,
    }),
    [SAVE_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [SAVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      save: null,
      error,
    }),
    [UPDATE_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      update: null,
      error,
    }),
    [DELETE_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      delete: null,
      error,
    }),
    [LOAD_WRITE_LIST_SUCCESS]: (state, { payload: boards }) => ({
      ...state,
      boards,
      error: null,
    }),
    [LOAD_WRITE_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boards: null,
      error,
    }),
    [SAVE_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
      error: null,
    }),
    [SAVE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      comments: null,
      error,
    }),
    [LOAD_COMMENTS_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
      error: null,
    }),
    [LOAD_COMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      comments: null,
      error,
    }),
    [DELETE_COMMENT_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [DELETE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      comment: null,
      error,
    }),
  },
  initialState,
);
