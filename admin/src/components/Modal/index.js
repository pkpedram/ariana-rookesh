import React from "react";

const Modal = ({ closeModal, children, title, className }) => {
  return (
    <div
      className={`fixed pt-8 w-full h-screen bg-black/40 backdrop-blur-sm top-0 right-0 z-40 flex items-start justify-center overflow-y-scroll`}
    >
      <div
        className="fixed z-40 w-full h-full  top-0 right-0"
        onClick={closeModal}
      ></div>
      <div
        className={`z-50 p-10 bg-gray-900 rounded-lg shadow-xl  ${className} my-8`}
      >
        <h1 className="text-white text-lg mb-3 w-96">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
