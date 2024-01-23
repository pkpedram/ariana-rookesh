import React, { useEffect } from "react";
import { connect } from "react-redux";
import productActions from "../../redux/actions/Products";
import List from "../../components/List";
import { useNavigate } from "react-router-dom";

const ProductListPage = ({
  getProductList,
  deleteProduct,
  productListCount,
  productList,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white">محصولات</h1>
      <List
        // addButtonOnClick={() => navigate("/product/add")}
        addButtonTitle="افزودن محصول جدید"
        addButtonLink="/product/add"
        items={productList}
        totals={productListCount}
        cols={[
          // {
          //   title: "شناسه",
          //   properties: [["_id"]],
          // },
          {
            title: "نام",
            properties: [["name"]],
          },

          {
            title: "نام انگلیسی",
            properties: [["en_name"]],
          },
          {
            title: "دسته بندی",
            properties: [["relatedCategory", "name"]],
          },
          {
            title: "قیمت",
            properties: [["price"]],
            type: "price",
          },
          {
            title: "مشاهده قیمت",
            properties: [["showPrice"]],
          },
        ]}
        config={{
          edit: (id) => {
            navigate("/products/" + id);
          },
          delete: async (id) => await deleteProduct(id),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productState.productList,
  productListCount: state.productState.productListCount,
});
const mapDispatchToProps = {
  getProductList: productActions.getProductList,
  deleteProduct: productActions.deleteProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
