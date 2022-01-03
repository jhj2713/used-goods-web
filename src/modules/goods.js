import { handleActions } from "redux-actions";
import * as goodsAPI from "../lib/api/goods";
import createRequestThunk, {
  createRequestActionTypes,
} from "../lib/createRequestThunk";

const [LOAD, LOAD_SUCCESS, LOAD_FAILURE] =
  createRequestActionTypes("goods/LOAD");
const [SAVE, SAVE_SUCCESS, SAVE_FAILURE] =
  createRequestActionTypes("goods/SAVE");
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] =
  createRequestActionTypes("goods/UPDATE");
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] =
  createRequestActionTypes("goods/DELETE");
const [
  PAGINATION_NEXT_BOARD,
  PAGINATION_NEXT_BOARD_SUCCESS,
  PAGINATION_NEXT_BOARD_FAILURE,
] = createRequestActionTypes("goods/PAGINATION_NEXT_BOARD");
const [
  PAGINATION_PREV_BOARD,
  PAGINATION_PREV_BOARD_SUCCESS,
  PAGINATION_PREV_BOARD_FAILURE,
] = createRequestActionTypes("goods/PAGINATION_PREV_BOARD");
const [LOAD_WRITE_GOODS, LOAD_WRITE_GOODS_SUCCESS, LOAD_WRITE_GOODS_FAILURE] =
  createRequestActionTypes("goods/LOAD_WRITE_GOODS");

export const loadGoods = createRequestThunk(LOAD, goodsAPI.loadGoods);
export const saveGoods = createRequestThunk(SAVE, goodsAPI.saveGoods);
export const updateGoods = createRequestThunk(UPDATE, goodsAPI.updateGoods);
export const deleteGoods = createRequestThunk(DELETE, goodsAPI.deleteGoods);
export const paginationNextBoard = createRequestThunk(
  PAGINATION_NEXT_BOARD,
  goodsAPI.paginationNextBoard,
);
export const paginationPrevBoard = createRequestThunk(
  PAGINATION_PREV_BOARD,
  goodsAPI.paginationPrevBoard,
);
export const loadWriteGoods = createRequestThunk(
  LOAD_WRITE_GOODS,
  goodsAPI.loadMyGoodsList,
);

const initialState = {
  goodsBoards: null,
  lastDoc: null,
  save: null,
  deleteBoard: null,
  isLast: false,
};

export default handleActions(
  {
    [LOAD_SUCCESS]: (state, { payload: doc }) => ({
      ...state,
      goodsBoards: doc.goodsBoards,
      lastDoc: doc.lastDoc,
      isLast: doc.isLast,
      error: null,
    }),
    [LOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      goodsBoards: null,
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
    [PAGINATION_NEXT_BOARD_SUCCESS]: (state, { payload: docs }) => ({
      ...state,
      goodsBoards: docs.goodsBoards,
      lastDoc: docs.lastDoc,
      isLast: docs.isLast,
      error: null,
    }),
    [PAGINATION_NEXT_BOARD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      goodsBoards: null,
      lastDoc: null,
      isLast: null,
      error,
    }),
    [PAGINATION_PREV_BOARD_SUCCESS]: (state, { payload: docs }) => ({
      ...state,
      goodsBoards: docs.goodsBoards,
      lastDoc: docs.lastDoc,
      isLast: docs.isLast,
      error: null,
    }),
    [PAGINATION_PREV_BOARD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boards: null,
      lastDoc: null,
      isLast: null,
      error,
    }),
    [LOAD_WRITE_GOODS_SUCCESS]: (state, { payload: goodsBoards }) => ({
      ...state,
      goodsBoards,
      error: null,
    }),
    [LOAD_WRITE_GOODS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      goodsBoards: null,
      error,
    }),
  },
  initialState,
);
