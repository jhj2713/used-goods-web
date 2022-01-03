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

export const loadGoods = createRequestThunk(LOAD, goodsAPI.loadGoods);
export const saveGoods = createRequestThunk(SAVE, goodsAPI.saveGoods);
export const updateGoods = createRequestThunk(UPDATE, goodsAPI.updateGoods);
export const deleteGoods = createRequestThunk(DELETE, goodsAPI.deleteGoods);

const initialState = {
  goodsBoards: null,
  save: null,
  deleteBoard: null,
};

export default handleActions(
  {
    [LOAD_SUCCESS]: (state, { payload: goodsBoards }) => ({
      ...state,
      goodsBoards,
      error: null,
    }),
    [LOAD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      goodsBoards: null,
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
