import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_SORT,
  SET_TOTAL,
  SET_SELECTED_PRODUCT
} from "./actionTypes";

import { getCategories } from "../../services/categoryService";
import { getProductById, getProducts } from "../../services/productService";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});
export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});

export const fetchCategoriesIfNeeded = () => {
  return async (dispatch, getState) => {
    const categories = getState().product.categories;

    if (categories.length > 0) return;

    try {
      const response = await getCategories();
      dispatch(setCategories(response.data));
    } catch (error) {
      console.error("Categories could not be fetched:", error);
      throw error;
    }
  };
};

export const fetchProducts = (params = {}) => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));

    try {
      const response = await getProducts(params);

      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      console.error("Products could not be fetched:", error);
      throw error;
    }
  };
};

export const fetchProductById = (productId) => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));

    try {
      const response = await getProductById(productId);

      dispatch(setSelectedProduct(response.data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      console.error("Product could not be fetched:", error);
      throw error;
    }
  };
};