import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import List from "../../components/List";
import { publicActions } from "../../redux/actions";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import ImageInput from "../../components/ImageInput";

const Content = ({
  provinces,
  provincesCount,
  getProvinces,
  deleteProvince,
  editProvince,
  addProvince,

  getCities,
  addCity,
  editCity,
  deleteCity,
  cities,
  citiesCount,

  staticAttributes,
  staticAttributesCount,

  getStaticAttributes,
  addStaticAttribute,
  editStaticAttribute,
  deleteStaticAttribute,
}) => {
  const [provinceModal, setProvinceModal] = useState(false);
  const [provinceVal, setProvinceVal] = useState({
    name: "",
    en_name: "",
    ordering: 0,
    isActive: true,
  });

  const [cityModal, setCityModal] = useState(false);
  const [cityVal, setCityVal] = useState({
    name: "",
    en_name: "",
    ordering: 0,
    relatedProvince: "",
    isActive: true,
  });

  const [saModal, setSAModal] = useState(false);
  const [saVal, setSAVal] = useState({
    title: "",
    en_title: "",
    isActive: true,
    icon: null,
  });

  useEffect(() => {
    getProvinces();
    getCities();
    getStaticAttributes();
  }, []);

  const handleProvinceChange = useCallback(
    (e) => {
      setProvinceVal({ ...provinceVal, [e.target.name]: e.target.value });
    },
    [provinceVal]
  );
  const handleCityChange = useCallback(
    (e) => {
      setCityVal({ ...cityVal, [e.target.name]: e.target.value });
    },
    [cityVal]
  );

  const handleSAChange = useCallback(
    (e) => {
      setSAVal({ ...saVal, [e.target.name]: e.target.value });
    },
    [saVal]
  );
  return (
    <>
      {provinceModal && (
        <Modal
          closeModal={() => {
            setProvinceModal(false);
            setProvinceVal({
              name: "",
              en_name: "",
              ordering: 0,
              isActive: true,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر استان</h1>
            <Input
              name={"name"}
              label={"نام"}
              onChange={handleProvinceChange}
              value={provinceVal.name}
            />
            <Input
              name={"en_name"}
              label={"نام انگلیسی"}
              onChange={handleProvinceChange}
              value={provinceVal.en_name}
            />
            <Input
              name={"ordering"}
              label={"ترتیب"}
              onChange={handleProvinceChange}
              value={provinceVal.ordering}
            />
            <Button
              onClick={() => {
                if (provinceModal?._id) {
                  editProvince(provinceVal, provinceModal?._id);
                } else {
                  addProvince(provinceVal);
                }
                setProvinceModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}
      {cityModal && (
        <Modal
          closeModal={() => {
            setCityModal(false);
            setCityVal({
              name: "",
              en_name: "",
              ordering: 0,
              relatedProvince: "",
              isActive: true,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر شهر</h1>
            <Select
              onChange={(e) => setCityVal({ ...cityVal, relatedProvince: e })}
              title={
                cityModal?._id
                  ? cities?.find((itm) => itm?._id === cityModal?._id)
                      ?.relatedProvince?.name
                  : "استان مربوطه"
              }
              items={provinces}
              keyOfOption={"name"}
            />
            <Input
              name={"name"}
              label={"نام"}
              onChange={handleCityChange}
              value={cityVal.name}
            />
            <Input
              name={"en_name"}
              label={"نام انگلیسی"}
              onChange={handleCityChange}
              value={cityVal.en_name}
            />
            <Input
              name={"ordering"}
              label={"ترتیب"}
              onChange={handleCityChange}
              value={cityVal.ordering}
            />
            <Button
              onClick={() => {
                if (cityModal?._id) {
                  editCity(cityVal, cityModal?._id);
                } else {
                  addCity(cityVal);
                }
                setCityModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}

      {saModal && (
        <Modal
          closeModal={() => {
            setSAModal(false);
            setSAVal({
              title: "",
              en_title: "",
              isActive: true,
              icon: null,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر ویژگی ثابت</h1>
            <Input
              name={"title"}
              label={"عنوان"}
              onChange={handleSAChange}
              value={saVal.title}
            />
            <Input
              name={"en_title"}
              label={"عنوان انگلیسی"}
              onChange={handleSAChange}
              value={saVal.en_title}
            />
            <div className="h-72">
              <ImageInput
                name={"icon"}
                title={"آیکون"}
                value={saVal.icon}
                onChange={(e) =>
                  setSAVal({
                    ...saVal,
                    icon: e.target.files[0],
                  })
                }
                deleteFile={(e) => setSAVal({ ...saVal, icon: null })}
                id={"sa_image"}
                className={"!max-h-[13rem]"}
              />
            </div>
            <Button
              onClick={() => {
                const formData = new FormData();

                Object.keys(saVal)?.map((item) =>
                  formData?.append(item, saVal[item])
                );

                if (saModal?._id) {
                  editStaticAttribute(formData, saModal?._id);
                } else {
                  addStaticAttribute(formData);
                }
                setSAModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}
      <h1 className="text-2xl text-white">استان ها</h1>
      <List
        addButtonOnClick={() => setProvinceModal(true)}
        addButtonTitle="افزودن استان جدید"
        items={provinces}
        totals={provincesCount}
        cols={[
          {
            title: "شناسه",
            properties: [["_id"]],
          },
          {
            title: "نام",
            properties: [["name"]],
          },
          {
            title: "نام انگلیسی",
            properties: [["en_name"]],
          },
        ]}
        config={{
          edit: (id) => {
            setProvinceModal({ _id: id });
            setProvinceVal(provinces?.find((itm) => itm?._id == id));
          },
          delete: async (id) => await deleteProvince(id),
        }}
      />
      <h1 className="text-2xl mt-10 text-white">شهر ها</h1>
      <List
        addButtonOnClick={() => setCityModal(true)}
        addButtonTitle="افزودن شهر جدید"
        items={cities}
        totals={citiesCount}
        cols={[
          {
            title: "شناسه",
            properties: [["_id"]],
          },
          {
            title: "نام",
            properties: [["name"]],
          },
          {
            title: "نام انگلیسی",
            properties: [["en_name"]],
          },
          {
            title: "استان مربوطه",
            properties: [["relatedProvince", "name"]],
          },
        ]}
        config={{
          edit: (id) => {
            setCityModal({ _id: id });
            setCityVal(cities?.find((itm) => itm?._id == id));
          },
          delete: async (id) => await deleteCity(id),
        }}
      />
      <h1 className="text-2xl mt-10 text-white">ویژگی های ثابت</h1>
      <List
        addButtonOnClick={() => setSAModal(true)}
        addButtonTitle="افزودن ویژگی جدید"
        items={staticAttributes}
        totals={staticAttributesCount}
        cols={[
          {
            title: "شناسه",
            properties: [["_id"]],
          },
          {
            title: "عنوان",
            properties: [["title"]],
          },
          {
            title: "عنوان انگلیسی",
            properties: [["en_title"]],
          },
        ]}
        config={{
          edit: (id) => {
            setSAModal({ _id: id });
            setSAVal(staticAttributes?.find((itm) => itm?._id == id));
          },
          delete: async (id) => await deleteStaticAttribute(id),
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  provinces: state.publicState.provinces,
  provincesCount: state.publicState.provincesCount,
  cities: state.publicState.cities,
  citiesCount: state.publicState.citiesCount,
  staticAttributes: state.publicState.staticAttributes,
  staticAttributesCount: state.publicState.staticAttributesCount,
});
const mapDispatchToProps = {
  getCities: publicActions.getCities,
  getProvinces: publicActions.getProvinces,
  addProvince: publicActions.addProvince,
  editProvince: publicActions.editProvince,
  deleteProvince: publicActions.deleteProvince,
  addCity: publicActions.addCity,
  editCity: publicActions.editCity,
  deleteCity: publicActions.deleteCity,

  getStaticAttributes: publicActions.getStaticAttributes,
  addStaticAttribute: publicActions.addStaticAttribute,
  editStaticAttribute: publicActions.editStaticAttribute,
  deleteStaticAttribute: publicActions.deleteStaticAttribute,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
