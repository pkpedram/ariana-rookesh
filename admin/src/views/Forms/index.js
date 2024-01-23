import React, { useEffect, useState } from "react";
import { publicActions } from "../../redux/actions";
import { connect } from "react-redux";
import List from "../../components/List";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

const Forms = ({
  getContactUsForms,
  deleteContactUsForm,
  contactUsForms,
  contactUsFormsCount,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    getContactUsForms();
  }, []);
  return (
    <>
      {modalOpened?._id && (
        <Modal
          closeModal={() => setModalOpened(false)}
          title={"فرم تماس" + " " + modalOpened?.fullName}
        >
          <div className="w-full flex flex-col  gap-4 max-w-[40rem]">
            <div className="w-full flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
              <p className="text-primary-600">تاریخ ثبت: </p>
              <p className="text-white">
                {new Date(modalOpened?.created_date).toLocaleString("fa-ir", {
                  dateStyle: "full",
                  timeStyle: "medium",
                })}
              </p>
            </div>
            <div className="w-full flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
              <p className="text-primary-600">نام کامل: </p>
              <p className="text-white">{modalOpened?.fullName}</p>
            </div>
            <div className="w-full flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
              <p className="text-primary-600">شماره تلفن: </p>
              <p className="text-white">{modalOpened?.phoneNumber}</p>
            </div>

            <div className="w-full flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
              <p className="text-primary-600">نام شرکت: </p>
              <p className="text-white">{modalOpened?.companyName}</p>
            </div>
            <div className="w-full flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
              <p className="text-primary-600">دسته بندی: </p>
              <p className="text-white">
                {modalOpened?.relatedContactUsFormCategory?.title}
              </p>
            </div>
            <div className="w-full flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
              <p className="text-primary-600">گروه محصول: </p>
              <p className="text-white">
                {modalOpened?.relatedProductCategory?.name}
              </p>
            </div>
            <div className="w-full p-2 bg-gray-800 rounded-lg">
              <p className="text-white">
                <span className="text-primary-600"> پیام: </span>
                {modalOpened?.message}
              </p>
            </div>
            <Button onClick={() => deleteContactUsForm(modalOpened?._id)}>
              حذف پیام
            </Button>
          </div>
        </Modal>
      )}
      <div className="w-full">
        <h1 className="text-white text-2xl">فرم های تماس</h1>

        <List
          // addButtonTitle='افزودن دسته بندی جدید'
          // addButtonOnClick={() => setModalOpened(true)}
          addButton={false}
          items={contactUsForms}
          cols={[
            {
              title: "نام",
              properties: [["fullName"]],
            },
            {
              title: "شماره تلفن",
              properties: [["phoneNumber"]],
            },
            {
              title: "دسته بندی",
              properties: [["relatedContactUsFormCategory", "title"]],
            },
            {
              title: "گروه محصول",
              properties: [["relatedProductCategory", "name"]],
            },
            {
              title: "زمان ثبت",
              properties: [["created_date"]],
              type: "dateTime",
            },
          ]}
          totals={contactUsFormsCount}
          config={{
            edit: (id) =>
              setModalOpened(contactUsForms.find((itm) => itm?._id == id)),
            delete: async (id) => await deleteContactUsForm(id),
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  contactUsForms: state.publicState.contactUsForms,
  contactUsFormsCount: state.publicState.contactUsFormsCount,
});
const mapDispatchToProps = {
  getContactUsForms: publicActions.getContactUsForms,
  deleteContactUsForm: publicActions.deleteContactUsForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
