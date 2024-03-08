import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input";
import CheckBox from "../../../components/CheckBox";
import TextBox from "../../../components/TextBox";
import { connect } from "react-redux";
import { publicActions } from "../../../redux/actions";
import Select from "../../../components/Select";
import { IoClose } from "react-icons/io5";
import Button from "../../../components/Button";
import ImageInput from "../../../components/ImageInput";
import productActions from "../../../redux/actions/Products";
import { ApiConfig } from "../../../redux/constants";
import Swal from "sweetalert2";
import SuggestedProducts from "../../../components/SuggestedProducts";
import HotOffer from "../../../components/HotOffer";

const ProductDetail = ({
  getStaticAttributes,
  staticAttributes,
  addProduct,
  sellers,
  getSellers,
  deleteProductAttribute,
  getProductInfoForEdit,
  getProductCategory,
  categories,
  productFullDetail,
  deleteProductImage,
  deleteProductStaticAttribute,
  editProduct,
  addProductStaticAttributs,
  addProductAttributes,
  addProductSeller,
  deleteProductSeller,
  addProductImage,
}) => {
  const { id } = useParams();
  const [tempSugs, setTempSugs] = useState([]);
  const [productVal, setProductVal] = useState({
    name: "",
    en_name: "",
    description: "",
    en_description: "",
    price: "",
    showPrice: true,
    offerPrice: "",
    isActive: true,
    relatedCategory: null,
  });
  const [images, setImages] = useState([]);
  const [selectedStaticAtts, setSelectedStaticAtts] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [hotOffer, setHotOffer] = useState({
    relatedProduct: null,
    offerPrice: "",
    from_date: new Date(),
    to_date: new Date(),
  });
  const [tempAtts, setTempAtts] = useState({
    title: "",
    value: "",
    en_title: "",
    en_value: "",
    isActive: true,
  });
  const [atts, setAtts] = useState([]);

  const handleChangeValue = useCallback((e) => {
    setProductVal({ ...productVal, [e.target.name]: e.target.value });
  });
  const handleAttChange = useCallback((e) => {
    setTempAtts({ ...tempAtts, [e.target.name]: e.target.value });
  });

  useEffect(() => {
    getStaticAttributes();
    getSellers();
    getProductCategory();
  }, []);

  useEffect(() => {
    if (id) {
      getProductInfoForEdit({}, id);
    }
  }, [id]);

  useEffect(() => {
    if (productFullDetail.hasOwnProperty("product") && id) {
      setProductVal(productFullDetail?.product);
      setSelectedStaticAtts(productFullDetail?.productStaticAttributes);
      setAtts(productFullDetail?.productAttributes);
      setSelectedSellers(productFullDetail?.productSellers);
      setImages(productFullDetail?.productImages);
      setHotOffer({
        from_date: productFullDetail?.hotOffer?.from_date,
        to_date: productFullDetail?.hotOffer?.to_date,
        offerPrice: productFullDetail?.hotOffer?.offerPrice,
        relatedProduct: id,
      });
    }
  }, [productFullDetail]);
  console.log(productVal);
  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl text-white">
          {id ? `تغییر محصول ${productVal?.name}` : "افزودن محصول"}
        </h1>
        <div className="w-full p-6 rounded-lg bg-gray-800 mt-8">
          <h2 className="text-white text-xl mb-4">مشخصات محصول</h2>
          <div className="w-full grid grid-cols-5 gap-4">
            <div className="w-full flex flex-col justify-between">
              <p className="mb-1 text-gray-200">دسته بندی</p>

              <Select
                onChange={(e) =>
                  setProductVal({ ...productVal, relatedCategory: e })
                }
                items={categories}
                keyOfOption={"name"}
                title={
                  id
                    ? categories?.find(
                        (itm) => itm._id === productVal?.relatedCategory
                      )?.name
                    : "انتخاب دسته بندی"
                }
              />
            </div>
            <Input
              name={"name"}
              label={"نام محصول"}
              onChange={handleChangeValue}
              value={productVal?.name}
            />
            <Input
              name={"en_name"}
              label={"نام محصول انگلیسی"}
              onChange={handleChangeValue}
              value={productVal?.en_name}
            />
            <Input
              name={"price"}
              label={"قیمت (تومان)"}
              onChange={handleChangeValue}
              value={productVal?.price}
            />
            <Input
              name={"offerPrice"}
              label={"قیمت با تخفیف (تومان)"}
              onChange={handleChangeValue}
              value={productVal?.offerPrice}
            />
            <div className="w-full flex items-end gap-2 pb-2 justify-center">
              <CheckBox
                onChange={(e) => setProductVal({ ...productVal, showPrice: e })}
                value={productVal?.showPrice}
              />
              <p className="text-primary-500">نمایش قیمت محصول در سایت</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <TextBox
              name={"description"}
              label={"توضیحات"}
              onChange={handleChangeValue}
              value={productVal?.description}
            />
            <TextBox
              name={"en_description"}
              label={"توضیحات انگلیسی"}
              onChange={handleChangeValue}
              value={productVal?.en_description}
            />
          </div>
          {id && (
            <div className="w-full flex justify-end mt-4">
              <Button
                className={"!w-max px-8 text-xl"}
                onClick={() => {
                  editProduct(productVal, id);
                }}
              >
                ثبت تغییرات
              </Button>
            </div>
          )}
        </div>
        <HotOffer hotOffer={hotOffer} setHotOffer={setHotOffer} edit={id} />
        <div className="w-full p-6 rounded-lg bg-gray-800 mt-8">
          <h2 className="text-white text-xl mb-8">ویژگی محصول</h2>
          <div className="w-full grid grid-cols-2 gap-8 mt-4">
            <div className="w-full">
              <p className="text-primary-500 mb-1">ویژگی های ثابت</p>
              <Select
                items={staticAttributes}
                onChange={async (e) => {
                  if (id) {
                    let res = await addProductStaticAttributs({
                      relatedProduct: id,
                      relatedStaticAttribute: e,
                    });
                    console.log(res);
                    if (res) {
                      getProductInfoForEdit({}, id);
                    }
                  } else {
                    if (!selectedStaticAtts?.find((itm) => itm == e)) {
                      setSelectedStaticAtts([...selectedStaticAtts, e]);
                    }
                  }
                }}
                keyOfOption={"title"}
                valueOfOption={"_id"}
              />
              <div className="w-full mt-6 flex flex-wrap gap-4">
                {selectedStaticAtts?.map((item) => (
                  <div className="bg-dark flex items-center gap-3 justify-between p-2 rounded-lg">
                    <p className="text-primary-200">
                      {item?._id
                        ? item.relatedStaticAttribute?.title
                        : staticAttributes?.find((itm) => itm._id === item)
                            .title}
                    </p>
                    <p
                      className="text-red-500 text-xl cursor-pointer"
                      onClick={() => {
                        if (item?._id) {
                          Swal.fire({
                            title: "آیا مطمئن هستید؟",
                            text: "در صورت حذف نمیتوانید آن را برگردانید!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "بله، حذف کن!",
                            cancelButtonText: "نه، کی گفته",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteProductStaticAttribute(item?._id);
                              setSelectedStaticAtts(
                                selectedStaticAtts?.filter(
                                  (itm) => itm?._id !== item?._id
                                )
                              );
                            }
                          });
                        } else {
                          setSelectedStaticAtts(
                            selectedStaticAtts?.filter((itm) => itm !== item)
                          );
                        }
                      }}
                    >
                      <IoClose />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="text-primary-500 mb-1">ویژگی های محصول</p>
              <div className="w-full grid grid-cols-5 gap-4">
                <Input
                  label={"عنوان"}
                  onChange={handleAttChange}
                  value={tempAtts.title}
                  name={"title"}
                />
                <Input
                  label={"عنوان انگلیسی"}
                  onChange={handleAttChange}
                  value={tempAtts.en_title}
                  name={"en_title"}
                />
                <Input
                  label={"مقدار"}
                  onChange={handleAttChange}
                  value={tempAtts.value}
                  name={"value"}
                />
                <Input
                  label={"مقدار انگلیسی"}
                  onChange={handleAttChange}
                  value={tempAtts.en_value}
                  name={"en_value"}
                />
                <Button
                  className={"mt-auto"}
                  onClick={async () => {
                    if (id) {
                      let res = await addProductAttributes({
                        ...tempAtts,
                        relatedProduct: id,
                      });
                      console.log(res);
                      if (res) {
                        getProductInfoForEdit({}, id);
                        setTempAtts({
                          title: "",
                          value: "",
                          en_title: "",
                          en_value: "",
                          isActive: true,
                        });
                      }
                    } else {
                      setAtts([...atts, tempAtts]);
                      setTempAtts({
                        title: "",
                        value: "",
                        en_title: "",
                        en_value: "",
                        isActive: true,
                      });
                    }
                  }}
                >
                  ثبت
                </Button>
              </div>
              <div className="w-full flex flex-wrap items-center gap-2 mt-4">
                {atts?.map((item, idx) => (
                  <div className="flex w-max items-center justify-between p-2 bg-dark rounded-lg">
                    <p className="text-primary-500">
                      {item.title}/{item.en_title} : {item.value}/
                      {item.en_value}
                    </p>
                    <p
                      className="text-red-500 text-xl cursor-pointer"
                      onClick={() => {
                        if (item?._id) {
                          Swal.fire({
                            title: "آیا مطمئن هستید؟",
                            text: "در صورت حذف نمیتوانید آن را برگردانید!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "بله، حذف کن!",
                            cancelButtonText: "نه، کی گفته",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteProductAttribute(item?._id);
                              setAtts(
                                atts?.filter((itm) => itm?._id !== item?._id)
                              );
                            }
                          });
                        } else {
                          setAtts(atts?.filter((itm, indx) => indx !== idx));
                        }
                      }}
                    >
                      <IoClose />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-6 rounded-lg bg-gray-800 mt-8">
          <h2 className="text-white text-xl mb-8">فروشنده های محصول</h2>
          <Select
            items={sellers}
            onChange={async (e) => {
              if (id) {
                let res = await addProductSeller({
                  relatedProduct: id,
                  relatedSeller: e,
                });
                if (res) {
                  getProductInfoForEdit({}, id);
                }
              } else {
                if (!selectedSellers?.find((itm) => itm == e)) {
                  setSelectedSellers([...selectedSellers, e]);
                }
              }
            }}
            keyOfOptionList={[
              {
                properties: [["name"]],
              },
              {
                properties: [["code"]],
                customText: "(کد نمایندگی)",
              },
              {
                properties: [["phoneNumber"]],
              },
              {
                properties: [["agentName"]],
              },
            ]}
            title={"انتخاب فروشنده"}
          />

          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            {selectedSellers?.map((item) => {
              let seller = item?.relatedProduct
                ? item?.relatedSeller
                : sellers?.find((itm) => itm._id === item);
              return (
                <div className="bg-dark p-6 rounded-md flex flex-col gap-2 relative">
                  <div
                    onClick={() => {
                      if (item?._id) {
                        Swal.fire({
                          title: "آیا مطمئن هستید؟",
                          text: "در صورت حذف نمیتوانید آن را برگردانید!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "بله، حذف کن!",
                          cancelButtonText: "نه، کی گفته",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteProductSeller(item?._id);
                            setSelectedSellers(
                              selectedSellers?.filter(
                                (itm) => itm?._id !== item?._id
                              )
                            );
                          }
                        });
                      } else {
                        setSelectedSellers(
                          selectedSellers?.filter((itm) => itm !== item)
                        );
                      }
                    }}
                    className="text-red-500 text-3xl cursor-pointer absolute left-4 top-4"
                  >
                    <IoClose />
                  </div>
                  <p className="text-primary-600">
                    نام: <span className="text-white mr-2">{seller?.name}</span>
                  </p>
                  <p className="text-primary-600">
                    نام انگلیسی:{" "}
                    <span className="text-white mr-2">{seller?.en_name}</span>
                  </p>
                  <p className="text-primary-600">
                    کد نمایندگی:{" "}
                    <span className="text-white mr-2">{seller?.code}</span>
                  </p>
                  <p className="text-primary-600">
                    شماره تلفن:{" "}
                    <span className="text-white mr-2">
                      {seller?.phoneNumber}
                    </span>
                  </p>
                  <p className="text-primary-600">
                    نام نماینده:{" "}
                    <span className="text-white mr-2">{seller?.agentName}</span>
                  </p>
                  <p className="text-primary-600">
                    آدرس:{" "}
                    <span className="text-white mr-2">{seller?.address}</span>
                  </p>
                  <p className="text-primary-600">
                    توضیحات:{" "}
                    <span className="text-white mr-2">
                      {seller?.description}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full p-6 rounded-lg bg-gray-800 mt-8">
          <h2 className="text-white text-xl mb-8">تصاویر محصول</h2>
          <ImageInput
            title={"افزودن تصویر"}
            id={"asd"}
            onChange={async (e) => {
              if (e.target.files?.length > 0) {
                if (id) {
                  const formData = new FormData();
                  formData.append("image", e.target.files[0]);
                  formData.append("relatedProduct", id);
                  let res = await addProductImage(formData);
                  if (res) {
                    getProductInfoForEdit({}, id);
                  }
                } else {
                  setImages([...images, e.target.files[0]]);
                }
              }
            }}
            value={null}
          />
          <div className="w-full mt-4 grid grid-cols-4 gap-4">
            {images?.map((image, idx) => (
              <div className="w-full flex flex-col">
                <div className="flex-1 flex items-center">
                  <img
                    src={
                      image?._id
                        ? ApiConfig.domain + image.image
                        : URL.createObjectURL(image)
                    }
                    className="w-full object-contain rounded-xl"
                  />
                </div>
                <p
                  onClick={() => {
                    if (image?._id) {
                      Swal.fire({
                        title: "آیا مطمئن هستید؟",
                        text: "در صورت حذف نمیتوانید آن را برگردانید!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "بله، حذف کن!",
                        cancelButtonText: "نه، کی گفته",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProductImage(image?._id);
                          setImages(
                            images?.filter((itm) => itm?._id !== image?._id)
                          );
                        }
                      });
                    } else {
                      setImages(images?.filter((itm, indx) => indx !== idx));
                    }
                  }}
                  className="w-full p-2 rounded-lg text-white bg-red-500 mt-4 text-lg cursor-pointer text-center"
                >
                  حذف تصویر
                </p>
              </div>
            ))}
          </div>
        </div>
        <SuggestedProducts
          edit={id}
          tempSuggestedProducts={tempSugs}
          setTempSuggestedProducts={(e) => setTempSugs(e)}
        />
        {!id && (
          <div className="w-full flex justify-end mt-4">
            <Button
              className={"!w-max px-8 text-xl"}
              onClick={() => {
                addProduct(
                  productVal,
                  selectedStaticAtts,
                  atts,
                  images,
                  selectedSellers,
                  tempSugs,
                  hotOffer
                );
              }}
            >
              تایید ثبت
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  staticAttributes: state.publicState.staticAttributes,
  sellers: state.publicState.sellers,
  productDetail: state.productState.productDetail,
  categories: state.productState.categories,
  productFullDetail: state.productState.productFullDetail,
});
const mapDispatchToProps = {
  getStaticAttributes: publicActions.getStaticAttributes,
  getSellers: publicActions.getSellers,
  addProduct: productActions.addProduct,
  getProductInfo: productActions.getProductInfo,
  getProductCategory: productActions.getProductCategory,
  getProductInfoForEdit: productActions.getProductInfoForEdit,
  deleteProductImage: productActions.deleteProductImage,
  deleteProductAttribute: productActions.deleteProductAttribute,
  deleteProductStaticAttribute: productActions.deleteProductStaticAttribute,
  editProduct: productActions.editProduct,
  addProductStaticAttributs: productActions.addProductStaticAttributs,
  addProductAttributes: productActions.addProductAttributes,
  addProductSeller: productActions.addProductSeller,
  deleteProductSeller: productActions.deleteProductSeller,
  addProductImage: productActions.addProductImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
