import _dataManager from "../dataManager";

const publicActions = {
  checkLayoutVersion: () => async (dispatch) => {
    if (window.innerWidth <= 900) {
      dispatch({ type: "SET_MOBILE", payload: true });
    } else {
      dispatch({ type: "SET_MOBILE", payload: false });
    }
    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth <= 900) {
          dispatch({ type: "SET_MOBILE", payload: true });
        } else {
          dispatch({ type: "SET_MOBILE", payload: false });
        }
      },
      true
    );
  },
  getGeneralStats: () => async (dispatch) => {
    await _dataManager.get("public/generalStats", {}, { dispatch });
  },
  // clientStats
  getClientStats: () => async (dispatch) => {
    await _dataManager.get(`public/clientStats`, {}, { dispatch });
  },

  getSeenData:
    (params = {}) =>
    async (dispatch) => {
      await _dataManager.get(
        "/public/seenData",
        {},
        { dispatch, params: params }
      );
    },

  //
  getNotifications:
    (data = {}, params = {}) =>
    async (dispatch) => {
      await _dataManager.get("notification", {}, { dispatch, params: params });
    },
  //

  getGeneralSettings: () => async (dispatch) => {
    await _dataManager.get("generalSetting", {}, { dispatch });
  },
  postGeneralSettings: (data) => async (dispatch) => {
    await _dataManager.post("generalSetting", data, {}, {}, true);
  },

  // contact us

  getContactUsCategories: (params) => async (dispatch) => {
    await _dataManager.get("contactUsFormCategory", {}, { dispatch, params });
  },
  addContactCateogory: (data) => async (dispatch) => {
    await _dataManager.post("contactUsFormCategory", data, {}, {}, true, {
      success: "دسته بندی با موفقیت افزوده شد",
    });
  },
  editContactCategory:
    (data = {}, id = "") =>
    async (dispatch) => {
      await _dataManager.put(
        `contactUsFormCategory/${id}`,
        data,
        {},
        {},
        true,
        { success: "دسته بندی با موفقیت تغییر یافت" }
      );
    },
  deleteContactCategory:
    (id = "") =>
    async (dispatch) => {
      await _dataManager.delete(
        `contactUsFormCategory/${id}`,
        {},
        {},
        {},
        true,
        { success: "دسته بندی با موفقیت حذف شد" }
      );
    },

  addProvince: (data) => async (dispatch) => {
    await _dataManager.post("province", data, {}, {}, true, {
      success: "استان با موفقیت افزوده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  editProvince: (data, id) => async (dispatch) => {
    await _dataManager.put("province/" + id, data, {}, {}, true, {
      success: "استان با موفقیت تغییر داده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  getProvinces: () => async (dispatch) => {
    await _dataManager.get("province", {}, { dispatch });
  },
  deleteProvince: (id) => async (dispatch) => {
    await _dataManager.delete("province/" + id, {}, {}, {}, true, {
      success: "استان با موفقیت حذف شد",
      error: "مشکلی پیش آمده است",
    });
  },

  addCity: (data) => async (dispatch) => {
    await _dataManager.post("city", data, {}, {}, true, {
      success: "شهر با موفقیت افزوده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  editCity: (data, id) => async (dispatch) => {
    await _dataManager.put("city/" + id, data, {}, {}, true, {
      success: "شهر با موفقیت تغییر داده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  getCities: () => async (dispatch) => {
    await _dataManager.get("city", {}, { dispatch });
  },
  deleteCity: (id) => async (dispatch) => {
    await _dataManager.delete("city/" + id, {}, {}, {}, true, {
      success: "شهر با موفقیت حذف شد",
      error: "مشکلی پیش آمده است",
    });
  },

  addStaticAttribute: (data) => async (dispatch) => {
    await _dataManager.post("staticAttribute", data, {}, {}, true, {
      success: "ویژگی ثابت با موفقیت افزوده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  editStaticAttribute: (data, id) => async (dispatch) => {
    await _dataManager.put("staticAttribute/" + id, data, {}, {}, true, {
      success: "ویژگی ثابت با موفقیت تغییر داده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  getStaticAttributes: () => async (dispatch) => {
    await _dataManager.get("staticAttribute", {}, { dispatch });
  },
  deleteStaticAttribute: (id) => async (dispatch) => {
    await _dataManager.delete("staticAttribute/" + id, {}, {}, {}, true, {
      success: "ویژگی ثابت با موفقیت حذف شد",
      error: "مشکلی پیش آمده است",
    });
  },

  addSeller: (data) => async (dispatch) => {
    await _dataManager.post("seller", data, {}, {}, true, {
      success: "فروشنده با موفقیت افزوده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  editSeller: (data, id) => async (dispatch) => {
    await _dataManager.put("seller/" + id, data, {}, {}, true, {
      success: "فروشنده با موفقیت تغییر داده شد",
      error: "مشکلی پیش آمده است",
    });
  },
  getSellers: () => async (dispatch) => {
    await _dataManager.get("seller", {}, { dispatch });
  },
  deleteSeller: (id) => async (dispatch) => {
    await _dataManager.delete("seller/" + id, {}, {}, {}, true, {
      success: "فروشنده با موفقیت حذف شد",
      error: "مشکلی پیش آمده است",
    });
  },
};

export default publicActions;
