import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import productActions from "../../redux/actions/Products";
import Modal from "../Modal";
import CheckBox from "../CheckBox";
import { FaTimesCircle } from "react-icons/fa";
import { ApiConfig } from "../../redux/constants";
import Swal from "sweetalert2";

const SuggestedProducts = ({
  edit,
  setTempSuggestedProducts,
  tempSuggestedProducts,
  getProductList,
  productList,
  productFullDetail,
  deleteSuggestedProduct,
  getProductInfoForEdit,
  addSuggestedProduct,
}) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProductList();
  }, []);

  console.log(tempSuggestedProducts);
  return (
    <>
      {modal && (
        <Modal closeModal={() => setModal(false)}>
          <h1 className="text-white">انتخاب محصول</h1>
          {productList.map((item) => (
            <div className="flex items-center justify-between w-full p-4 bg-gray-800 my-2 rounded-lg">
              <h1 className="rtl text-right text-white">
                {item.relatedCategory?.name} - {item.name}{" "}
              </h1>
              <CheckBox
                value={
                  tempSuggestedProducts?.find(
                    (itm) => itm.suggestedProduct === item._id
                  ) ||
                  productFullDetail?.suggestedProducts?.find(
                    (itm) => itm.suggestedProduct?._id === item._id
                  )
                }
                onChange={async (e) => {
                  if (edit) {
                    if (
                      productFullDetail?.suggestedProducts?.find(
                        (itm) => itm.suggestedProduct?._id === item._id
                      )
                    ) {
                      Swal.fire({
                        title: "آیا مطمئن هستید؟",
                        text: "در صورت حذف نمیتوانید آن را برگردانید!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "بله، حذف کن!",
                        cancelButtonText: "نه، کی گفته",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          await deleteSuggestedProduct(
                            productFullDetail?.suggestedProducts?.find(
                              (itm) => itm.suggestedProduct?._id === item._id
                            )?._id,
                            edit
                          );
                        }
                      });
                    } else {
                      await addSuggestedProduct(
                        {
                          relatedProduct: edit,
                          suggestedProduct: item._id,
                          isActive: true,
                        },
                        edit
                      );
                    }
                  } else {
                    if (
                      tempSuggestedProducts?.find(
                        (itm) => itm.suggestedProduct === item._id
                      )
                    ) {
                      setTempSuggestedProducts(
                        tempSuggestedProducts.filter(
                          (itm) => itm.suggestedProduct !== item._id
                        )
                      );
                    } else {
                      setTempSuggestedProducts([
                        ...tempSuggestedProducts,
                        {
                          suggestedProduct: item._id,
                          isActive: true,
                        },
                      ]);
                    }
                  }
                }}
              />
            </div>
          ))}
        </Modal>
      )}
      <div className="w-full my-4 p-4 bg-gray-800 rounded-xl ">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-white text-xl"> محصولات مشابه</h1>
          <button
            onClick={() => setModal(true)}
            className="bg-primary-700 hover:bg-primary-500 hover:text-black text-white p-2 px-8 rounded-md"
          >
            افزودن
          </button>
        </div>
        <div className="w-full grid grid-cols-4 gap-4 mt-2">
          {edit
            ? productFullDetail?.suggestedProducts?.map((item) => (
                <div className="w-full bg-dark p-4 rounded-lg shadow-md">
                  <div className="w-full flex justify-end">
                    <FaTimesCircle
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title: "آیا مطمئن هستید؟",
                          text: "در صورت حذف نمیتوانید آن را برگردانید!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "بله، حذف کن!",
                          cancelButtonText: "نه، کی گفته",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            await deleteSuggestedProduct(item._id, edit);
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="w-full aspect-square overflow-hidden bg-gray-900 my-3 rounded-lg">
                    <img
                      src={`${ApiConfig.domain}${item.suggestedProduct.image}`}
                    />
                  </div>
                  <h1 className="text-white">
                    {item.suggestedProduct.relatedCategory?.name} -{" "}
                    {item.suggestedProduct.name}
                  </h1>
                </div>
              ))
            : null}
          {tempSuggestedProducts.map((sp) => {
            let product = productList.find(
              (itm) => itm._id === sp.suggestedProduct
            );

            return (
              <div className="w-full bg-dark p-4 rounded-lg shadow-md">
                <div className="w-full flex justify-end">
                  <FaTimesCircle
                    className="text-red-500 cursor-pointer"
                    onClick={() =>
                      setTempSuggestedProducts(
                        tempSuggestedProducts.filter(
                          (itm) => itm.suggestedProduct !== product?._id
                        )
                      )
                    }
                  />
                </div>
                <div className="w-full aspect-square overflow-hidden bg-gray-900 my-3 rounded-lg">
                  <img src={`${ApiConfig.domain}${product.image}`} />
                </div>
                <h1 className="text-white">
                  {product.relatedCategory.name} - {product.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productState.productList,
  productFullDetail: state.productState.productFullDetail,
});
const mapDispatchToProps = {
  getProductList: productActions.getProductList,
  deleteSuggestedProduct: productActions.deleteSuggestedProduct,
  getProductInfoForEdit: productActions.getProductInfoForEdit,
  addSuggestedProduct: productActions.addSuggestedProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedProducts);
