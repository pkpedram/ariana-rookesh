import React , {FC} from 'react'
import Head from "next/head";
import Layout from "../Core/Layout";
import { wrapper } from "../Core/Redux/store";
import type { AppProps } from "next/app";
import {Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify';

// Style
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "../Core/Components/ErrorBoundary";

const  MyApp : FC<AppProps> = ({ Component, ...rest }) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>پروژه مصاحبه طاقچه</title>
      </Head>
      <ErrorBoundary>
      <Component {...props.pageProps} />
      </ErrorBoundary>
      <ToastContainer />
    </Layout>
    </Provider>
  );
}

export default MyApp;
