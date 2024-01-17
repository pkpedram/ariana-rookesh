import _dataManager from "../../dataManager";
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
    (data = {}) =>
    async (dispatch) => {
      await _dataManager.post("blogPost", data, {}, {}, "/blog", {
        success: "پست با موفقیت افزوده شد",
        error: "مشکلی پیش آمده",
      });
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
