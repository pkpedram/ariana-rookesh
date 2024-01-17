import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import { connect } from "react-redux";
import { RootState } from "../../Redux/store";

const Footer = ({layoutType} :  {layoutType: number}) => {
  return layoutType === 3 ? null : (
    <>
      <div className="w-full flex flex-col items-center p-8 bg-white gap-8">
        <FooterTop />
        <FooterBottom />
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-[#666] text-white">
        ©Taaghche.com
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
layoutType: state.publicState.layoutType
})

export default connect(mapStateToProps)(Footer);
