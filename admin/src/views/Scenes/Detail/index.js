import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import sceneActions from "../../../redux/actions/Scenes";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import clientsActions from "../../../redux/actions/Clients";
import TextBox from "../../../components/TextBox";
import ImageInput from "../../../components/ImageInput";
import ObjectInput from "../../../components/ObjectInput";
import Button from "../../../components/Button";
import { BiArrowToLeft, BiEditAlt, BiTrash } from "react-icons/bi";
import { publicActions } from "../../../redux/actions";

const SceneEditPage = ({
  getSceneInfo,
  sceneInfo,
  getClients,
  clientsList,
  userData,
  client,
  editScene,
  postScene,
  sceneSettings,
  settingsList,
  getSettings,
  getSceneSettingsList,
  postSceneSettingsList,
  deleteSceneSettingsList
}) => {
  const { id } = useParams();
  const [value, setValue] = useState({
    mass: "",
    clientId: null,
    image: null,
    obj: null,
    name: "",
    description: "",
    cameraX: 0,
    cameraY: 0,
    cameraZ: 0,
  });

  useMemo(() => {
    if (!client) {
      getClients();
      getSettings();
      if(id){
        getSceneSettingsList({}, {sceneId: id})
      }
    }
    if (id) {
      getSceneInfo(id);
   
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (sceneInfo?._id) {
        setValue({
          mass: sceneInfo.mass,
          clientId: client ? userData?._id : sceneInfo.clientId?._id,
          image: sceneInfo.image,
          obj: sceneInfo.obj,
          name: sceneInfo.name,
          description: sceneInfo.description,
          cameraX: sceneInfo?.cameraX,
          cameraY: sceneInfo?.cameraY,
          cameraZ: sceneInfo?.cameraZ,
        });
      }
      
    }
  }, [sceneInfo]);

  useEffect(() => {
    if(client){
      setValue({
        ...value,
        clientId: userData?._id
      })
    }
  }, [client])

  const changeVal = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const submitRequest = async (e) => {
    e.preventDefault();
    let keys = Object.keys(value);
    let formData = new FormData();
    keys.map((item) => formData.append(item, value[item]));
    if (id) {
      await editScene(formData, sceneInfo?._id);
    } else {
      await postScene(formData);
    }
  };

  return (
    <div className={`bg-gray-900 p-8 rounded-lg shadow-xl w-full`}>
      <form onSubmit={submitRequest}>
        <h1 className="text-xl text-white">
          {id ? "اطلاعات صحنه" + " " + sceneInfo?.name : "افزودن صحنه جدید"}
        </h1>
        <div className="my-8 w-full flex items-center gap-4">
          <Input
            name={"name"}
            value={value.name}
            onChange={changeVal}
            placeholder={"نام..."}
          />
          <Input
            name={"mass"}
            value={value.mass}
            onChange={changeVal}
            placeholder={"طول و عرض و ارتفاع (x,y,z)"}
          />
          {!client && (
            <Select
              items={clientsList}
              title={
                sceneInfo?._id ? sceneInfo?.clientId?.name : "انتخاب مشتری..."
              }
              keyOfOption={"name"}
              valueOfOption={"_id"}
              onChange={(e) => setValue({ ...value, clientId: e })}
            />
          )}
        </div>
        <h3 className="text-primary-500 mb-3">زاویه دوربین (z, y, x)</h3>
        <div className=" mb-3 w-full flex gap-6 items-center justify-between">
        <Input
            name={"cameraX"}
            value={value.cameraX}
            onChange={changeVal}
            placeholder={"x"}
          />
           <Input
            name={"cameraY"}
            value={value.cameraY}
            onChange={changeVal}
            placeholder={"y"}
          />
           <Input
            name={"cameraZ"}
            value={value.cameraZ}
            onChange={changeVal}
            placeholder={"z"}
          />
          </div>
        <TextBox
          name={"description"}
          className={"mb-6"}
          value={value.description}
          onChange={changeVal}
          placeholder={"توضیحات..."}
        />

        <ImageInput
          id={"scene_img"}
          value={value.image}
          title={"تصویر شاخص صحنه"}
          onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
          deleteFile={() => setValue({ ...value, image: null })}
        />
        <ObjectInput
          id={"scene_obj"}
          value={value.obj}
          title={"آبجکت صحنه"}
          className={"mt-4"}
          onChange={(e) => setValue({ ...value, obj: e.target.files[0] })}
          deleteFile={() => setValue({ ...value, obj: null })}
        />
                {
                    !client && <>
                    <h1 className="mt-8 text-xl text-primary-600">تنظیمات صحنه</h1>
              <div className="w-full flex my-4 gap-6">
                    <div 
                    
                    className="h-[15rem] w-full overflow-x-hidden p-4 overflow-scroll bg-gray-800 rounded-lg shadow-lg">
                            <p>تنظیمات موجود</p>
                            {
                                settingsList?.filter(itm => !sceneSettings.map(item => item.settingId._id).includes(itm._id))?.map(item => (
                                    <div 
                                    onClick={() => postSceneSettingsList({
                                        sceneId: id,
                                        settingId: item._id
                                    }, {sceneId: id})}
                                    className="flex items-center cursor-pointer justify-between bg-gray-900 text-primary-600 p-3 my-3 rounded-lg shadow-lg">
                                       <p> {item.name}</p>
                                       <p className="text-xl"><BiArrowToLeft /></p>
                                        </div>
                                ))
                            }
                    </div>
                    <div 
                    
                    className="h-[15rem] w-full overflow-x-hidden p-4 overflow-scroll cursor-pointer bg-gray-800 rounded-lg shadow-lg">
                            <p>تنظیمات صحنه</p>
                            {
                                sceneSettings?.map(item => (
                                    <div 
                                    onClick={() => deleteSceneSettingsList(item._id, {sceneId: id})}
                                    className="flex items-center justify-between cursor-pointer bg-gray-900 text-primary-600 p-3 my-3 rounded-lg shadow-lg">
                                       <p> {item.settingId.name}</p>
                                       <p className="text-xl text-red-800"><BiTrash /></p>
                                        </div>
                                ))
                            }
                    </div>
              </div>
</>
                }
        <div className="w-full flex items-center justify-end mt-8">
          <Button className={"!w-max px-6"}>
            <p>
              <BiEditAlt />
            </p>
            <p>ثبت تغییرات</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sceneInfo: state.sceneState.sceneInfo,
  clientsList: state.clientsState.clientsList,
  client: state.userState.client,
  userData: state.userState.userData,
  sceneSettings: state.sceneState.sceneSettings,
  settingsList: state.publicState.settingsList,
});
const mapDispatchToProps = {
  getSceneInfo: sceneActions.getSceneInfo,
  getClients: clientsActions.getClients,
  editScene: sceneActions.editScene,
  postScene: sceneActions.postScene,
  getSceneSettingsList: sceneActions.getSceneSettingsList,
  deleteSceneSettingsList: sceneActions.deleteSceneSettingsList,
  postSceneSettingsList: sceneActions.postSceneSettingsList,
  getSettings: publicActions.getSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(SceneEditPage);
