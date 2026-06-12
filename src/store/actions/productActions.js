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

// API'den gelen toplam ürün sayısını store'a kaydeder.
export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

// API isteğinin durumunu yönetir.
// FETCHING/FETCHED/FAILED
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


// Kategorileri API'den çeker.
// Gereksiz istek atmamak için
// store'da kategori varsa tekrar API çağırmaz.
export const fetchCategoriesIfNeeded = () => {
  return async (dispatch, getState) => {
    const categories = getState().product.categories;

    // Kategoriler daha önce çekilmişse tekrar çekme!
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


// Ürün listesini API'den çeker.
export const fetchProducts = (params = {}) => {
  return async (dispatch) => {

    // Loader başlat.
    dispatch(setFetchState("FETCHING"));

    try {
      const response = await getProducts(params);

      // Ürünleri store'a kaydet.
      dispatch(setProductList(response.data.products));

      // Toplam ürün sayısını store'a kaydet.
      dispatch(setTotal(response.data.total));

      // Yükleme tamamlandı.
      dispatch(setFetchState("FETCHED"));

    } catch (error) {

      dispatch(setFetchState("FAILED"));

      console.error("Products could not be fetched:", error);
      throw error;
    }
  };
};


// Ürün detay sayfası için
export const fetchProductById = (productId) => {
  return async (dispatch) => {

    dispatch(setFetchState("FETCHING"));

    try {
      const response = await getProductById(productId);

      // Gelen ürünü selectedProduct state'ine kaydet.
      dispatch(setSelectedProduct(response.data));

      dispatch(setFetchState("FETCHED"));

    } catch (error) {

      dispatch(setFetchState("FAILED"));

      console.error("Product could not be fetched:", error);
      throw error;
    }
  };
};