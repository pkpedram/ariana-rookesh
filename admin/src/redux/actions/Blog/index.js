import { ApiConfig } from "../../constants";
import _dataManager from "../../dataManager";
import axios from "axios";
import { toast } from "react-toastify";
const blogActions = {
  getPostList: (data, params) => async (dispatch) => {
    await _dataManager.get("blogPost", data, { dispatch, params });
  },
  getPostDetail:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.get("blogPost/" + id, {}, { dispatch }, { id });
    },
  addPost:
    (data = {}, sections = [], faqs = []) =>
    async (dispatch) => {
      console.log(faqs);
      try {
        dispatch({ type: "LOADING_START" });

        let res = await axios.post(ApiConfig.baseUrl + "/blogPost", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        if (res.data) {
          [...sections, 1].map(async (item, index) => {
            try {
              if (typeof item === "object") {
                const formData = new FormData();
                Object.keys(item).map((itm) => formData.append(itm, item[itm]));
                formData.append("relatedBlogPost", res.data.result?._id);
                let sectionRes = await axios.post(
                  ApiConfig.baseUrl + "/blogPostSection",
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  }
                );
              }
              if (index == [...sections, 1].length - 1) {
                [...faqs, 1].map(async (faq, idx) => {
                  try {
                    console.log(faq);
                    if (typeof faq === "object") {
                      let faqRes = await axios.post(
                        ApiConfig.baseUrl + "/blogPostFaq",
                        {
                          ...faq,
                          relatedBlogPost: res.data.result?._id,
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
                    if (idx == [...faqs, 1].length - 1) {
                      dispatch({ type: "LOADING_END" });
                      toast.success("پست با موفقیت افزوده شد");
                      setTimeout(() => {
                        window.location.href = "/blog";
                      }, 1000);
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error("مشکلی پیش آمده است");

                    dispatch({ type: "LOADING_END" });
                  }
                });
              }
            } catch (error) {
              console.error(error);
              toast.error("مشکلی پیش آمده است");

              dispatch({ type: "LOADING_END" });
            }
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("مشکلی پیش آمده است");

        dispatch({ type: "LOADING_END" });
      }
    },
  editPost:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.put(
        "blogPost/" + id,
        data,
        { dispatch },
        { id: id },
        "/blog",
        { success: "پست بلاگ با موفقیت ویرایش شد", error: "مشکلی پیش آمده است" }
      );
    },
  deletePost:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete("blogPost/" + id, {}, {}, {}, "/blog");
    },
  getCategories: (data, params) => async (dispatch) => {
    await _dataManager.get("blogCategory", data, { dispatch, params });
  },
  addCategory:
    (data = {}) =>
    async (dispatch) => {
      await _dataManager.post("blogCategory", data, { dispatch }, {});
    },
  editCategory:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.put(
        "blogCategory/" + id,
        data,
        { dispatch },
        { id: id },
        {},
        { success: "عملیات با موفقیت انجام شد" }
      );
    },
  deleteCategory:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(
        "blogCategory/" + id,
        {},
        { dispatch },
        { id: id },
        { success: "با موفقیت حذف شد" }
      );
    },
};

export default blogActions;
