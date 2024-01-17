import { ApiConfig } from "../../constants";
import _dataManager from "../../dataManager";
import axios from "axios";

const productActions = {
  addProductCategory: (data) => async (dispatch) => {
    await _dataManager.post("category", data, {}, {}, true, {
      success: "دسته بندی با موفقیت افزوده شد",
    });
  },
  editProductCategory:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.put(`category/${id}`, data, {}, {}, true, {
        success: "دسته بندی با موفقیت تغییر یافت",
      });
    },
  getProductCategory: (params) => async (dispatch) => {
    await _dataManager.get("category", {}, { dispatch, params });
  },
  deleteProductCategory:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(`category/${id}`, {}, {}, {}, true, {
        success: "دسته بندی با موفقیت حذف شد",
      });
    },

  addProduct:
    (data = {}, staticAtts = [], atts, images, sellers = []) =>
    async (dispatch) => {
      try {
        dispatch({ type: "LOADING_START" });

        let res = await axios.post(ApiConfig.baseUrl + "/product", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        if (res.data) {
          staticAtts.map(async (item, staticIdx) => {
            try {
              let staticAttsRes = await axios.post(
                ApiConfig.baseUrl + "/productStaticAttributes",
                {
                  relatedProduct: res.data?.result?._id,
                  relatedStaticAttribute: item,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                }
              );
              if (staticAttsRes?.data && staticIdx === staticAtts?.length - 1) {
                sellers?.map(async (seller, sellerIdx) => {
                  try {
                    let sellerRes = await axios.post(
                      ApiConfig.baseUrl + "/productSeller",
                      {
                        relatedProduct: res.data?.result?._id,
                        relatedSeller: seller,
                        isActive: true,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "access"
                          )}`,
                        },
                      }
                    );

                    if (sellerRes?.data && sellerIdx == sellers?.length - 1) {
                      atts?.map(async (attItem, attIndex) => {
                        try {
                          let attRes = await axios.post(
                            ApiConfig.baseUrl + "/productAttribute",
                            {
                              ...attItem,
                              relatedProduct: res.data?.result?._id,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "access"
                                )}`,
                              },
                            }
                          );

                          if (attRes.data && attIndex == atts?.length - 1) {
                            images?.map(async (imageItem, imgIndex) => {
                              try {
                                const formData = new FormData();
                                formData.append("image", imageItem);
                                formData.append(
                                  "relatedProduct",
                                  res.data?.result?._id
                                );
                                let imageRes = await axios.post(
                                  ApiConfig.baseUrl + "/productImage",
                                  formData,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${localStorage.getItem(
                                        "access"
                                      )}`,
                                    },
                                  }
                                );

                                if (
                                  imageRes?.data &&
                                  imgIndex == images?.length - 1
                                ) {
                                  dispatch({ type: "LOADING_END" });
                                }
                              } catch (error) {
                                console.error(error);
                                dispatch({ type: "LOADING_END" });
                              }
                            });
                          }
                        } catch (error) {
                          console.error(error);
                          dispatch({ type: "LOADING_END" });
                        }
                      });
                    }
                  } catch (error) {
                    console.error(error);
                    dispatch({ type: "LOADING_END" });
                  }
                });
              }
            } catch (error) {
              console.error(error);
              dispatch({ type: "LOADING_END" });
            }
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "LOADING_END" });
      }
    },
  editProduct:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.put(`product/${id}`, data, {}, {}, true, {
        success: "محصول با موفقیت تغییر یافت",
      });
    },
  getProductList: (params) => async (dispatch) => {
    await _dataManager.get("product", {}, { dispatch, params });
  },
  getProductInfo:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.get(`product/${id}`, {}, { dispatch }, { id: id });
    },
  deleteProduct:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(`product/${id}`, {}, {}, {}, true, {
        success: " محصول با موفقیت حذف شد",
      });
    },
};

export default productActions;
