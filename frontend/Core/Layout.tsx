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
  handleLanguege: Function;
}

const Layout = ({
  children,
  checkLayoutVersion,
  layoutType,
  postSeen,
  handleLanguege,
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
    handleLanguege();
  }, []);
  return (
    <div
      className={`w-full bg-position-center bg-cover bg-center bg-no-repeat ${
        layoutType === 1 ? "bg-white" : layoutType === 2 ? "bg-black" : ""
      } flex ${
        // layoutType === 3 ? "h-screen" :
        "min-h-screen"
      } flex-col`}
      style={
        layoutType === 3
          ? {
              background: layoutType === 3 ? `url(${bg.src})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
      }
    >
      <Header />

      <div
        className={`flex-1 ${
          layoutType === 2 ? "" : "mt-40 md:mt-28"
        } [&>*]:max-w-[90rem]  [&>*]:px-4 [&>*]:mx-auto w-full  `}
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
  handleLanguege: publicActions.handleLanguege,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
