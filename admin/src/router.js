import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./layout";
import userActions from "./redux/actions/User";
import Login from "./views/Login";
import AdminDashboard from "./views/AdminDashboard";
import Error404 from "./views/Error404";

import Users from "./views/Users";
import BlogList from "./views/Blog";
import BlogDetail from "./views/Blog/Detail";
import GeneralSettings from "./views/generalSettings";
import Categories from "./views/Categories";
import Content from "./views/Content";
import Seller from "./views/Seller";
import Products from "./views/Products";
import ProductDetail from "./views/Products/Detail";
import Forms from "./views/Forms";

const CostumeRouter = ({ setUserStatus, isLogin, client }) => {
  useEffect(() => {
    setUserStatus();
  }, []);

  let routes = [
    {
      path: "/",
      element: <AdminDashboard />,
    },
    {
      path: "/blog",
      element: <BlogList />,
    },
    {
      path: "/blog/add",
      element: <BlogDetail />,
    },
    {
      path: "/blog/:id",
      element: <BlogDetail />,
    },
    {
      path: "/generalSettings",
      element: <GeneralSettings />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/content",
      element: <Content />,
    },
    {
      path: "/sellers",
      element: <Seller />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/product/add",
      element: <ProductDetail />,
    },
    {
      path: "/forms",
      element: <Forms />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ];

  return (
    <BrowserRouter>
      {
        <Routes>
          {!isLogin ? (
            <Route path="*" element={<Login />} />
          ) : (
            routes
              .filter((itm) => typeof itm == "object")
              .map((item) => (
                <Route
                  path={item.path}
                  element={<Layout>{item.element}</Layout>}
                />
              ))
          )}
        </Routes>
      }
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => ({
  isLogin: state.userState.isLogin,
  client: state.userState.client,
});
const mapDispatchToProps = {
  setUserStatus: userActions.setUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(CostumeRouter);
