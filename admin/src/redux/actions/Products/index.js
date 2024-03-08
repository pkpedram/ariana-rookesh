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
    (
      data = {},
      staticAtts = [],
      atts,
      images,
      sellers = [],
      suggestedProducts = [],
      hotOffer = {}
    ) =>
    async (dispatch) => {
      try {
        dispatch({ type: "LOADING_START" });

        let res = await axios.post(ApiConfig.baseUrl + "/product", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        if (res.data) {
          const staticAttributes = Promise.all(
            staticAtts.map(async (item, idx) => {
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
                return staticAttsRes;
              } catch (error) {
                console.error(error);
                toast.error(
                  `ویژگی ثابت شماره ${idx}: ${error?.response?.data?.message}` ??
                    `مشکلی در درخواست مربوط به ویژگی ثابت ${idx} وجود دارد`
                );
                return false;
              }
            })
          );
          const sellersRes = Promise.all(
            sellers.map(async (seller, idx) => {
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
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  }
                );
                return sellerRes;
              } catch (error) {
                console.error(error);
                toast.error(
                  ` فروشنده شماره ${idx}: ${error?.response?.data?.message}` ??
                    `مشکلی در درخواست مربوط به فروشنده  ${idx} وجود دارد`
                );
                return false;
              }
            })
          ).then((re) => re);

          const attsRes = Promise.all(
            atts.map(async (attItem, idx) => {
              try {
                let attRes = await axios.post(
                  ApiConfig.baseUrl + "/productAttribute",
                  {
                    ...attItem,
                    relatedProduct: res.data?.result?._id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  }
                );
                return attRes;
              } catch (error) {
                console.error(error);
                toast.error(
                  ` ویژگی شماره ${idx}: ${error?.response?.data?.message}` ??
                    `مشکلی در درخواست مربوط به ویژگی  ${idx} وجود دارد`
                );
                return false;
              }
            })
          ).then((re) => re);

          const imagesRes = Promise.all(
            images.map(async (imageItem, idx) => {
              try {
                const formData = new FormData();
                formData.append("image", imageItem);
                formData.append("relatedProduct", res.data?.result?._id);
                let imageRes = await axios.post(
                  ApiConfig.baseUrl + "/productImage",
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  }
                );
                return imageRes;
              } catch (error) {
                console.error(error);
                toast.error(
                  ` تصویر شماره ${idx}: ${error?.response?.data?.message}` ??
                    `مشکلی در درخواست مربوط به تصویر  ${idx} وجود دارد`
                );
                return false;
              }
            })
          ).then((re) => re);

          const sugPrsRes = Promise.all(
            suggestedProducts.map(async (sg, idx) => {
              try {
                let sgRes = await axios.post(
                  ApiConfig.baseUrl + "/suggestedProduct",
                  {
                    ...sg,
                    relatedProduct: res.data?.result?._id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  }
                );
                return sgRes;
              } catch (error) {
                console.error(error);
                toast.error(
                  ` محصول مشابه شماره ${idx}: ${error?.response?.data?.message}` ??
                    `مشکلی در درخواست مربوط به محصول مشابه  ${idx} وجود دارد`
                );
                return false;
              }
            })
          ).then((re) => re);

          const hotOfferRes = new Promise(async () => {
            try {
              let htRes = await axios.post(
                ApiConfig.baseUrl + "/hotOffer",
                { ...hotOffer, relatedProduct: res.data?.result?._id },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                }
              );
              return htRes;
            } catch (error) {
              console.error(error);
              toast.error(
                `  ${error?.response?.data?.message}` ??
                  `مشکلی در درخواست مربوط به پیشنهاد ویژه وجود دارد`
              );
              return false;
            }
          });

          Promise.all([
            staticAttributes,
            sellersRes,
            attsRes,
            imagesRes,
            sugPrsRes,
            hotOfferRes,
          ])
            .then((i) => {
              dispatch({ type: "LOADING_END" });
              console.log(i);
              toast.success("محصول با موفقیت افزوده شد");
              setTimeout(() => {
                window.location.href = "/products/" + res.data?.result?._id;
              }, 1000);
            })
            .catch((err) => console.error(err));
        }
      } catch (error) {
        console.error(error, error?.response?.data);
        toast.error(error?.response?.data?.message ?? "مشکلی پیش آمده است");
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
  deleteSuggestedProduct:
    (id = "", productId) =>
    async (dispatch) => {
      let res = await _dataManager.delete(
        `suggestedProduct/${id}`,
        {},
        {},
        {},
        false
      );
      if (res) {
        await _dataManager.get(
          "productforedit/" + productId,
          {},
          { dispatch },
          { id: productId }
        );
      }
      return res;
    },
  addSuggestedProduct:
    (data = {}, productId) =>
    async (dispatch) => {
      let res = await _dataManager.post(
        "suggestedProduct",
        data,
        {},
        {},
        false
      );
      console.log(res);
      if (res) {
        await _dataManager.get(
          "productforedit/" + productId,
          {},
          { dispatch },
          { id: productId }
        );
      }
      return res;
    },
  addHotOffer: (data) => async (dispatch) =>
    await _dataManager.post("/hotOffer", data, {}, {}, false),
};

export default productActions;
