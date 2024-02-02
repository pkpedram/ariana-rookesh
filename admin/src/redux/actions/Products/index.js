import { ApiConfig } from "../../constants";
import _dataManager from "../../dataManager";
import axios from "axios";
import { toast } from "react-toastify";

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
          [...staticAtts, 1].map(async (item, staticIdx) => {
            try {
              if (typeof item === "object") {
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
              }
              if (staticIdx === staticAtts?.length - 1) {
                [...sellers, 1]?.map(async (seller, sellerIdx) => {
                  try {
                    if (typeof seller === "object") {
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
                    }

                    if (sellerIdx == sellers?.length - 1) {
                      [...atts, 1]?.map(async (attItem, attIndex) => {
                        try {
                          if (typeof attItem === "object") {
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
                          }

                          if (attIndex == atts?.length - 1) {
                            [...images, 1]?.map(async (imageItem, imgIndex) => {
                              try {
                                if (typeof imageItem !== "number") {
                                }
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

                                if (imgIndex == images?.length - 1) {
                                  dispatch({ type: "LOADING_END" });
                                  toast.success("محصول با موفقیت افزوده شد");
                                  setTimeout(() => {
                                    window.location.href = "/products";
                                  }, 1000);
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
  getProductInfoForEdit:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.get(
        "productforedit/" + id,
        data,
        { dispatch },
        { id: id }
      );
    },
  editProduct:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.put(`product/${id}`, data, {}, {}, false, {
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
  deleteProductImage:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(`productImage/${id}`, {}, {}, {}, false);
    },
  deleteProductAttribute:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(`productAttribute/${id}`, {}, {}, {}, false);
    },
  deleteProductStaticAttribute:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(
        `productStaticAttributes/${id}`,
        {},
        {},
        {},
        false
      );
    },
  deleteProductSeller:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(`productSeller/${id}`, {}, {}, {}, false);
    },
  addProductStaticAttributs:
    (data = {}) =>
    async (dispatch) => {
      return await _dataManager.post(
        "productStaticAttributes",
        data,
        {},
        {},
        false,
        {
          success: "ویژگی ثابت با موفقیت افزوده شد",
        }
      );
    },
  addProductAttributes:
    (data = {}) =>
    async (dispatch) => {
      return await _dataManager.post("productAttribute", data, {}, {}, false, {
        success: "ویژگی با موفقیت افزوده شد",
      });
    },
  addProductSeller:
    (data = {}) =>
    async (dispatch) => {
      return await _dataManager.post("productSeller", data, {}, {}, false, {
        success: "فروشنده با موفقیت افزوده شد",
      });
    },
  addProductImage:
    (data = {}) =>
    async (dispatch) => {
      return await _dataManager.post("productImage", data, {}, {}, false, {
        success: "تصویر با موفقیت افزوده شد",
      });
    },
};

export default productActions;
