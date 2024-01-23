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
}: any) => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [openAtts, setOpenAtts] = useState(false);
  return (
    <div className="w-full flex flex-col gap-12 mb-20">
      <div className="w-full gap-6  flex justify-between">
        <div className="w-[30rem] flex h-full">
          <div className="flex h-max min-w-[8rem] flex-col gap-4">
            {productImages
              ?.filter(
                (itm: { _id: string }) => itm?._id !== selectedImage?._id
              )
              ?.map((img: { image: string }) => (
                <img
                  src={apiConfig.domain + img.image}
                  onClick={() => setSelectedImage(img)}
                  className="w-24 bg-white rounded-md cursor-pointer aspect-square object-contain"
                />
              ))}
          </div>
          <div className="h-full bg-white rounded-xl">
            <img
              src={apiConfig.domain + selectedImage?.image}
              className="object-contain aspect-square "
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl text-white font-bold">{productInfo?.name}</h1>
          <p className="text-gray-300 mt-6">{productInfo?.description}</p>
        </div>
        <div className="w-max min-w-[20rem] p-4 flex flex-col justify-between bg-white rounded-lg">
          <div className="flex flex-col min-w-max gap-2">
            {productStaticAtts?.map((staticAtt: any) => (
              <div className="flex gap-3 items-center">
                <img
                  src={
                    apiConfig.domain + staticAtt?.relatedStaticAttribute?.icon
                  }
                  className="w-6"
                />
                <p>{staticAtt?.relatedStaticAttribute?.title}</p>
              </div>
            ))}
          </div>
          <button
            className="w-full p-5 py-4 rounded-lg text-white"
            onClick={() => window.open("tel:" + generalSetting?.phoneNumber)}
            style={{ background: generalSetting.secondaryColor }}
          >
            استعلام قیمت
          </button>
        </div>
      </div>
      <div className="flex flex-col p-6 border-2 border-white rounded-xl">
        <div className="w-full flex items-center justify-between text-white">
          <p className="text-xl">مشخصات محصول</p>
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
              className={`w-full flex gap-2 ${
                openAtts ? " opacity-95 z-0" : " opacity-25 z-[-1]"
              }`}
            >
              <p
                className="p-2 text-white rounded w-40 text-center"
                style={{ background: generalSetting.secondaryColor }}
              >
                {att.title}:
              </p>
              <p className="p-2 bg-white text-black w-full rounded">
                {att.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-6 border-2 border-white rounded-xl">
        <h1 className="text-xl font-bold text-white">فروشنده ها</h1>
        {productSellers?.map((seller: any) => (
          <div className="w-full flex gap-4 p-6 border-2 border-white rounded-xl mt-6">
            <div className="w-40">
              <p className="text-xl font-bold mb-4 text-white">
                {seller?.relatedSeller?.name}
              </p>
              <p className="text-gray-300">
                {seller?.relatedSeller?.relatedCity?.name}
              </p>
            </div>
            <div className="flex-1 ">
              <p className="text-lg font-bold text-white mb-4">
                {productInfo?.name}
              </p>
              <p className="text-gray-300">
                {seller?.relatedSeller?.description}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() =>
                  window.open("tel:" + seller?.relatedSeller?.phoneNumber)
                }
                className="p-2 text-white rounded w-32 text-center"
                style={{ background: generalSetting.secondaryColor }}
              >
                سفارش
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-white text-xl font-bold">محصولات مشابه</h3>
      <div className="w-full  relative  grid grid-cols-4 gap-4">
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
              <h4 className="font-bold mb-2 text-right w-full">{item.name}</h4>
              <p className="w-full text-right color-[#F2F4F8]">
                {item.description}
              </p>
              <button
                className="w-full p-5 rounded-lg"
                style={{ background: generalSetting.secondaryColor }}
              >
                مشاهده محصول
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
});

export default connect(mapStateToProps)(ProductDetailPage);
