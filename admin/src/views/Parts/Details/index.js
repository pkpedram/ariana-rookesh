import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import clientsActions from "../../../redux/actions/Clients";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import sceneActions from "../../../redux/actions/Scenes";
import TextBox from "../../../components/TextBox";
import ImageInput from "../../../components/ImageInput";
import ObjectInput from "../../../components/ObjectInput";
import CheckBox from "../../../components/CheckBox";
import PdfInput from "../../../components/PdfInput";
import Button from "../../../components/Button";

const PartDetailPage = ({
  partInfo,
  getPartInfo,
  getScenes,
  sceneList,
  client,
  userData,
  getPartCategories,
  partCategoriesList,
  getPlaces,
  placeList,
  postPart,
  putPart,
}) => {
  const { id } = useParams();

  const [value, setValue] = useState({
    name: "",
    image: "",
    categoryId: "",
    placeId: "",
    obj: "",
    x: "",
    y: "",
    z: "",
    rotateX: "",
    rotateY: "",
    rotateZ: "",
    scale: "",
    isMain: "",
    sceneId: "",
    typeOfObject: "",
    description: "",
    pdf: "",
    clicked: 0,
  });

  useEffect(() => {
    if (id) {
      getPartInfo(id);
    }
  }, [id]);

  useEffect(() => {
    if (userData?._id && client) {
      getScenes({}, { clientId: userData?._id });
    } else {
      getScenes();
    }
  }, [client]);

  useMemo(() => {
    if (value.sceneId?.length !== 0) {
      getPartCategories({}, { sceneId: value.sceneId });
      getPlaces({}, { sceneId: value.sceneId });
    } else {
      if (id) {
        getPartCategories();
        getPlaces();
      }
    }
  }, [value.sceneId]);

  useMemo(() => {
    if (partInfo?._id) {
      setValue({
        ...partInfo,
        sceneId: partInfo?.sceneId?._id,
        placeId: partInfo?.placeId?._id,
        categoryId: partInfo?.categoryId?._id,
      });
    }
  }, [partInfo]);

  const changeVal = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const submitRequest = async () => {
    let formData = new FormData();
    let keys = Object.keys(value);
    keys.map((item) => formData.append(item, value[item]));
    if (id) {
      putPart(formData, id);
    } else {
      postPart(formData);
    }
  };

  return (
    <div className="w-full p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-xl text-primary-600">
        {id ? `اطلاعات آبجکت ${partInfo?._id}` : "افزودن آبجکت"}
      </h1>
      <Input
        placeholder={"نام"}
        name={"name"}
        value={value.name}
        className={"mt-8"}
        onChange={changeVal}
      />
      <div className="grid w-full gap-4 grid-cols-3 my-3 ">
        <Select
          items={sceneList}
          onChange={(e) => setValue({ ...value, sceneId: e })}
          keyOfOptionList={[
            {
              properties: ["name"],
            },
            !client && {
              properties: ["clientId", "name"],
              customText: "(مشتری)",
            },
          ]}
          title={partInfo?._id ? partInfo?.sceneId?.name : "انتخاب صحنه"}
        />
        <Select
          items={partCategoriesList}
          onChange={(e) => setValue({ ...value, categoryId: e })}
          keyOfOptionList={[
            {
              properties: ["name"],
            },
            !client && {
              properties: ["sceneId", "name"],
              customText: "(صحنه)",
            },
          ]}
          title={
            partInfo?._id ? partInfo?.categoryId?.name : "انتخاب دسته بندی"
          }
        />
        <Select
          items={placeList}
          onChange={(e) => setValue({ ...value, placeId: e })}
          keyOfOptionList={[
            {
              properties: ["name"],
            },
            !client && {
              properties: ["sceneId", "name"],
              customText: "(صحنه)",
            },
          ]}
          title={partInfo?._id ? partInfo?.placeId?.name : "انتخاب دسته بندی"}
        />
      </div>
      <div className="w-full flex gap-3 items-center">
        <div className="  rounded-lg w-full">
          <h3 className="text-primary-700 mb-3">پوزیشن: z y x</h3>
          <div className="grid grid-cols-3 gap-3">
            <Input name={"x"} value={value.x} onChange={changeVal} />
            <Input name={"y"} value={value.y} onChange={changeVal} />
            <Input name={"z"} value={value.z} onChange={changeVal} />
          </div>
        </div>
        <div className="  rounded-lg w-full">
          <h3 className="text-primary-700 mb-3">روتیشن: z y x</h3>
          <div className="grid grid-cols-3 gap-3">
            <Input
              name={"rotateX"}
              value={value.rotateX}
              onChange={changeVal}
            />
            <Input
              name={"rotateY"}
              value={value.rotateY}
              onChange={changeVal}
            />
            <Input
              name={"rotateZ"}
              value={value.rotateZ}
              onChange={changeVal}
            />
          </div>
        </div>
        <div className="  rounded-lg flex w-full gap-3 items-end">
          <div className=" w-full ">
            <h3 className="text-primary-700 mb-3">scale</h3>
            <Input name={"scale"} value={value.scale} onChange={changeVal} />
          </div>
          <div className=" w-full flex items-start justify-between">
            <h3 className="text-primary-700 mb-3">آبجکت اصلی صحنه</h3>
            {/* <Input name={'scale'} value={value.scale} onChange={changeVal} /> */}
            <CheckBox
              value={value.isMain}
              onChange={(e) => setValue({ ...value, isMain: e })}
            />
          </div>
        </div>
      </div>
      <h1 className="my-3 text-primary-700">توضیحات</h1>
      <TextBox
        name={"description"}
        value={value.description}
        onChange={changeVal}
        placeholder={"توضیحات"}
      />

      <ImageInput
        title={"تصویر شاخص"}
        id={"image"}
        name={"image"}
        onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
        deleteFile={() => setValue({ ...value, image: null })}
        value={value.image}
      />

      <ObjectInput
        id={"object"}
        name={"object"}
        onChange={(e) => setValue({ ...value, obj: e.target.files[0] })}
        deleteFile={() => setValue({ ...value, obj: null })}
        title={"آبجکت"}
        value={value.obj}
      />
      <PdfInput
        id={"pdf"}
        name={"pdf"}
        onChange={(e) => setValue({ ...value, pdf: e.target.files[0] })}
        deleteFile={() => setValue({ ...value, pdf: null })}
        title={"کاتالوگ"}
        value={value.pdf}
      />

      <div className="w-full flex items-center justify-end mt-8">
        <Button onClick={submitRequest} className={"w-max px-3"}>
          ثبت اطلاعات
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  partInfo: state.clientsState.partInfo,
  sceneList: state.sceneState.sceneList,
  client: state.userState.client,
  userData: state.userState.userData,
  partCategoriesList: state.sceneState.partCategoriesList,
  placeList: state.sceneState.placeList,
});
const mapDispatchToProps = {
  getPartInfo: clientsActions.getPartInfo,
  getScenes: sceneActions.getScenes,
  getPartCategories: sceneActions.getPartCategories,
  getPlaces: sceneActions.getPlaces,
  postPart: clientsActions.postPart,
  putPart: clientsActions.putPart,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartDetailPage);
