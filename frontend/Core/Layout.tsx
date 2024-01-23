import React, { ReactNode, useEffect } from "react";
import Header from "./Components/Header";
import { RootState } from "./Redux/store";
import { connect } from "react-redux";
import { publicActions } from "./Redux/Actions";
import Footer from "./Components/Footer";
import { useConnect } from "./Utils/Hooks";
import { toast } from "react-toastify";
import bg from "../public/assets/image/homeBg.jpeg";

export interface LayoutType {
  children: ReactNode;
  checkLayoutVersion: Function;
  layoutType: number;
  bg?: string;
  postSeen: Function;
}

const Layout = ({
  children,
  checkLayoutVersion,
  layoutType,
  postSeen,
}: LayoutType) => {
  const isConnected = useConnect();

  useEffect(() => {
    if (!isConnected) {
      toast.error("لطفا اتصال خود به اینترنت را چک کنید");
    } else {
      postSeen();
    }
  }, [isConnected]);

  useEffect(() => {
    checkLayoutVersion();
  }, []);
  return (
    <div
      className={`w-full  ${
        layoutType === 1 ? "bg-white" : layoutType === 2 ? "bg-black" : ""
      } flex ${
        // layoutType === 3 ? "h-screen" :
        "min-h-screen"
      } flex-col`}
      style={{
        background: layoutType === 3 ? `url(${bg.src})` : "",
        backgroundSize: "cover",
      }}
    >
      <Header />

      <div
        className={`flex-1 ${
          layoutType === 2 ? "" : "mt-40"
        } max-w-[95rem] mx-auto w-full  `}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  layoutType: state.publicState.layoutType,
});
const mapDispatchToProps = {
  checkLayoutVersion: publicActions.checkLayoutVersion,
  postSeen: publicActions.postSeen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
