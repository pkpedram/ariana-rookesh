import React, { HTMLAttributes } from "react";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`bg-[#F3F3F3] ${props.className} outline-none placeholder:text-black h-14 rounded-lg px-4 w-full`}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(Input);
