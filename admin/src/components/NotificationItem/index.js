import React from "react";
import { BiSolidErrorCircle, BiSolidError } from "react-icons/bi";
import { BsCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const NotificationItem = ({ item, client }) => {
  const navigate = useNavigate();

  let { type, text, link, created_date } = item;

  let types = {
    success: ` border border-primary-600 ${
      link ? "hover:bg-primary-600 cursor-pointer" : ""
    }`,
    error: `border border-red-700 ${
      link ? "hover:bg-red-600 cursor-pointer shadow-xl" : ""
    }`,
    info: `border border-blue-700 ${
      link ? "hover:bg-blue-600 cursor-pointer" : ""
    }`,
  };
  let iconClassnames = {
    success: "text-primary-600",
    error: "text-red-600",
    info: "text-blue-600",
  };
  let icons = {
    success: <BsCheckCircleFill />,
    error: <BiSolidErrorCircle />,
    info: <BsInfoCircleFill />,
  };
  return (
    <div
      onClick={() => (link?.length > 0 ? navigate(link) : null)}
      className={`w-full p-3 rounded-lg shadow-lg text-white ${types[type]}`}
    >
      <div className="flex items-center justify-between">
        <div className="w-full flex items-center">
          <p className={`text-xl ml-2 ${iconClassnames[type]}`}>
            {icons[type]}
          </p>
          <p>{text}</p>
        </div>
        <p className={`text-xs`}>
          {new Date(created_date).toLocaleDateString("fa-ir")}
        </p>
      </div>
      <div className="w-full flex justify-end">
        {/* <p>{new Date(created_date).toLocaleDateString('fa-ir')}</p> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  client: state.userState.client,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
