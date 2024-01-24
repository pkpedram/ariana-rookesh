import React, { useState } from "react";
import { RootState, wrapper } from "../../../../Core/Redux/store";
import { GetServerSideProps } from "next";
import { apiConfig } from "../../../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const ProductDetailPage = ({
  productAtts,
  productImages,
  productStaticAtts,
  productSellers,
  productInfo,
  productList,
  generalSetting,
  lan
}: any) => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [openAtts, setOpenAtts] = useState(false);

  // console.log(productImages)

  return (
    <div className={`w-full flex flex-col gap-12 mb-20 `}>
      <div className={`w-full gap-6 flex  lg:flex-col ${lan ? "!flex-row-reverse lg:!flex-col" : ""}`}>
        <div className="w-[30rem] lg:w-full flex lg:flex-col-reverse lg:gap-6  h-full">
          <div className="flex h-max min-w-[8rem] flex-col lg:flex-row lg:justify-center gap-4">
            {productImages
              ?.filter(
                (itm: { _id: string }) => itm?._id !== selectedImage?._id
              )
              ?.map((img: { image: string }) => (
                <img
                  src={apiConfig.domain + img.image}
                  onClick={() => setSelectedImage(img)}
                  className="w-24 xs:w-16 bg-white rounded-md cursor-pointer aspect-square object-contain"
                />
              ))}
          </div>
          <div className="h-full bg-white rounded-xl">
            <img
              src={apiConfig.domain + selectedImage?.image}
              className="object-contain aspect-square"
            />
          </div>
        </div>
        <div className={`flex flex-1 2lg:!flex-col justify-between  gap-6 ${lan ? "!flex-row-reverse sm:flex-col text-left" : "lg:!flex-row sm:!flex-col"}`}>
          <div className="flex-1">
            <h1 className="text-2xl text-white font-bold">{lan ? productInfo?.en_name :productInfo?.name}</h1>
            <p className="text-gray-300 mt-6">{lan ? productInfo?.en_description :productInfo?.description}</p>
          </div>
          <div className="w-max min-w-[20rem] sm:!w-full p-4 flex flex-col justify-between bg-white rounded-lg">
            <div className="flex flex-col min-w-max gap-2">
              {productStaticAtts?.map((staticAtt: any) => (
                <div className={`flex gap-3 items-center ${lan ? "!flex-row-reverse text-left" : ""}`}>
                  <img
                    src={
                      apiConfig.domain + staticAtt?.relatedStaticAttribute?.icon
                    }
                    className="w-6"
                  />
                  <p>{lan ? staticAtt?.relatedStaticAttribute?.en_title :staticAtt?.relatedStaticAttribute?.title}</p>
                </div>
              ))}
            </div>
            <button
              className={`w-full p-5 py-4 rounded-lg text-white`}
              onClick={() => window.open("tel:" + generalSetting?.phoneNumber)}
              style={{ background: generalSetting.secondaryColor }}
            >
              {
                lan
                ?
                "Price"
                :
                "استعلام قیمت"
              }
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 border-2 border-white rounded-xl">
        <div className={`w-full flex items-center justify-between text-white ${lan ? "!flex-row-reverse text-left" : ""}`}>
          <p className="text-xl"> {lan ? "Information" : "مشخصات محصول" }</p>
          <p
            onClick={() => setOpenAtts((prev) => !prev)}
            className={`text-2xl cursor-pointer ${
              openAtts ? "rotate-180" : ""
            }`}
          >
            <FaChevronDown />
          </p>
        </div>

        <div
          className={` w-full flex flex-col gap-3  ${
            openAtts ? "h-full mt-6 " : " h-0  "
          }`}
        >
          {productAtts?.map((att: any) => (
            <div
              className={`w-full flex xs:flex-col gap-2 ${lan ? "flex-row-reverse text-left items-end" : ""} ${
                openAtts ? " opacity-95 z-0" : " opacity-25 z-[-1]"
              }`}
            >
              <p
                className="p-2 text-white rounded w-40 text-center"
                style={{ background: generalSetting.secondaryColor }}
              >
                {lan ? `:${att.en_title}` : `${att.title}:`}
              </p>
              <p className={`p-2 bg-white text-black w-full rounded ${lan ? "text-left" : ""}`}>
                {lan ? att.en_value : att.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-6 border-2 border-white rounded-xl">
        <h1 className={`text-xl font-bold text-white ${lan ? "text-left":""}`}> {lan ? "Seller" : "فروشنده ها"}</h1>
        {productSellers?.map((seller: any) => (
          <div className={`w-full flex sm:!grid sm:!grid-cols-2 gap-4 sm:gap-y-6 smmd:!grid-cols-1 p-6 border-2 border-white rounded-xl mt-6 ${lan ? "flex-row-reverse text-left" : ""}`}>
            <div className={`w-40 smmd:w-full sm:flex sm:flex-col sm:w-full sm:items-center`}>
              <p className="text-xl font-bold mb-4 text-white">
                {lan ? seller?.relatedSeller?.en_name : seller?.relatedSeller?.name}
              </p>
              <p className="text-gray-300">
                {lan ? seller?.relatedSeller?.relatedCity?.en_name : seller?.relatedSeller?.relatedCity?.name}
              </p>
            </div>
            <div className="flex-1 sm:flex sm:flex-col sm:items-center">
              <p className="text-lg font-bold text-white mb-4">
                {lan ? productInfo?.en_name : productInfo?.name}
              </p>
              <p className="text-gray-300">
                {lan ? seller?.relatedSeller?.en_description : seller?.relatedSeller?.description}
              </p>
            </div>
            <div className="flex sm:col-span-full items-center justify-center order-3">
              <button
                onClick={() =>
                  window.open("tel:" + seller?.relatedSeller?.phoneNumber)
                }
                className="p-2 text-white rounded w-32 text-center"
                style={{ background: generalSetting.secondaryColor }}
              >
                {lan ? "Order" : "سفارش"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className={`text-white text-xl font-bold ${lan ? "text-left" : ""}`}>{lan ? "Simillar Products" :"محصولات مشابه" } </h3>
      <div className="w-full  relative  grid grid-cols-4 2lg:grid-cols-2 sm:grid-cols-1 gap-4">
        {[
          ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
          // ...productList,
        ]
          ?.filter((itm) => itm._id !== productInfo?._id)
          .map((item) => (
            <Link
              href={`/product/${item._id}/${item.name.split(" ").join("-")}`}
              className="w-full p-3 border-2 text-white bg-black/50 hover:bg-black hover:scale-100 scale-90 border-white rounded-xl flex flex-col gap-4 items-center justify-center"
            >
              <img
                src={apiConfig.domain + item.image ?? ""}
                className="w-full rounded-lg bg-gray-500 object-cover aspect-square"
              />
              <h4 className={`font-bold mb-2 w-full ${lan ? "text-left" : "text-right"} `}>{lan? item.en_name: item.name}</h4>
              <p className={`w-full color-[#F2F4F8] ${lan ? "text-left" : "text-right"}`}>
                {lan ? item.en_description : item.description}
              </p>
              <button
                className="w-full p-5 rounded-lg"
                style={{ background: generalSetting.secondaryColor }}
              >
                {lan? "View Product" :"مشاهده محصول"}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    // Fetching BookList for the first Time
    console.log(query);
    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();

    // const categoryRes = await axios.get(
    //   apiConfig.baseUrl + "category?slug="
    // );

    const productRes = await axios.get(
      apiConfig.baseUrl + "product/" + query?.productId
      // / +
      // categoryRes.data.result[0]?._id
    );

    const similarProductsRes = await axios.get(
      apiConfig.baseUrl +
        "product?relatedCategory=" +
        productRes?.data?.result.relatedCategory?._id
    );

    const productAttributes = await axios.get(
      apiConfig.baseUrl + "productAttribute?relatedProduct=" + query?.productId
    );
    // console.log(productAttributes.data, "pa");
    const productSellers = await axios.get(
      apiConfig.baseUrl + "productSeller?relatedProduct=" + query?.productId
    );
    const productStaticAttributes = await axios.get(
      apiConfig.baseUrl +
        "productStaticAttributes?relatedProduct=" +
        query?.productId
    );

    const productImages = await axios.get(
      apiConfig.baseUrl + "productImage?relatedProduct=" + query?.productId
    );
    store.dispatch({
      type: "productList",
      payload: JSON.stringify(similarProductsRes.data),
    });
    store.dispatch({
      type: "productSeller",
      payload: JSON.stringify(productSellers.data),
    });
    store.dispatch({
      type: "productAtts",
      payload: JSON.stringify(productAttributes.data),
    });
    store.dispatch({
      type: "productStaticAtts",
      payload: JSON.stringify(productStaticAttributes.data),
    });
    store.dispatch({
      type: "productImages",
      payload: JSON.stringify(productImages.data),
    });
    store.dispatch({
      type: "productInfo",
      payload: JSON.stringify(productRes.data.result),
    });
    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 2 });
    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });

    return {
      props: {},
    };
  });

const mapStateToProps = (state: RootState) => ({
  productAtts: state.productState.productAtts,
  productImages: state.productState.productImages,
  productStaticAtts: state.productState.productStaticAtts,
  productSellers: state.productState.productSellers,
  productInfo: state.productState.productInfo,
  productList: state.productState.productList,
  generalSetting: state.publicState.generalSetting,
  lan:state.publicState.lan
});

export default connect(mapStateToProps)(ProductDetailPage);
