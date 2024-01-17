import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import List from "../../components/List";
import { publicActions } from "../../redux/actions";
import Modal from "../../components/Modal";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import TextBox from "../../components/TextBox";

const Sellers = ({
  sellers,
  sellersCount,
  getSellers,
  addSeller,
  editSeller,
  deleteSeller,
  cities,
  getCities,
}) => {
  const [modal, setModal] = useState(false);
  const [val, setVal] = useState({
    name: "",
    relatedCity: "",
    description: "",
    en_name: "",
    en_description: "",
    phoneNumber: "",
    code: "",
    address: "",
    agentName: "",
    isActive: true,
  });

  useEffect(() => {
    getSellers();
    getCities();
  }, []);

  const handleChange = useCallback((e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  });

  return (
    <>
      {modal && (
        <Modal
          closeModal={() => {
            setModal(false);
            setVal({
              name: "",
              relatedCity: "",
              description: "",
              en_name: "",
              en_description: "",
              phoneNumber: "",
              code: "",
              address: "",
              agentName: "",
              isActive: true,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر فروشنده</h1>
            <Select
              onChange={(e) => setVal({ ...val, relatedCity: e })}
              title={
                modal?._id
                  ? cities?.find((itm) => itm?._id === modal?.relatedCity?._id)
                      ?.name
                  : "شهر مربوطه"
              }
              items={cities}
              keyOfOption={"name"}
            />
            <Input
              name={"name"}
              label={"نام"}
              onChange={handleChange}
              value={val.name}
            />
            <Input
              name={"en_name"}
              label={"نام انگلیسی"}
              onChange={handleChange}
              value={val.en_name}
            />
            <Input
              name={"phoneNumber"}
              label={"شماره تماس"}
              onChange={handleChange}
              value={val.phoneNumber}
            />
            <Input
              name={"code"}
              label={"کد نمایندگی"}
              onChange={handleChange}
              value={val.code}
            />
            <Input
              name={"agentName"}
              label={"نام نماینده"}
              onChange={handleChange}
              value={val.agentName}
            />
            <TextBox
              name={"address"}
              label={"آدرس"}
              onChange={handleChange}
              value={val.address}
            />
            <TextBox
              name={"description"}
              label={"توضیحات"}
              onChange={handleChange}
              value={val.description}
            />
            <TextBox
              name={"en_description"}
              label={"توضیحات انگلیسی"}
              onChange={handleChange}
              value={val.en_description}
            />
            <Button
              onClick={() => {
                if (modal?._id) {
                  editSeller(val, modal?._id);
                } else {
                  addSeller(val);
                }
                setModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}
      <h1 className="text-2xl text-white">فروشنده ها</h1>
      <List
        addButtonOnClick={() => setModal(true)}
        addButtonTitle="افزودن فروشنده جدید"
        items={sellers}
        totals={sellersCount}
        cols={[
          {
            title: "شناسه",
            properties: [["_id"]],
          },
          {
            title: "کد نمایندگی",
            properties: [["code"]],
          },
          {
            title: "نام",
            properties: [["name"]],
          },
          {
            title: "نام نماینده",
            properties: [["agentName"]],
          },
          {
            title: "شماره تلفن",
            properties: [["phoneNumber"]],
          },
        ]}
        config={{
          edit: (id) => {
            setModal({ _id: id });
            setVal(sellers?.find((itm) => itm?._id == id));
          },
          delete: async (id) => await deleteSeller(id),
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  sellers: state.publicState.sellers,
  sellersCount: state.publicState.sellersCount,
  cities: state.publicState.cities,
});
const mapDispatchToProps = {
  getSellers: publicActions.getSellers,
  addSeller: publicActions.addSeller,
  editSeller: publicActions.editSeller,
  deleteSeller: publicActions.deleteSeller,
  getCities: publicActions.getCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sellers);
