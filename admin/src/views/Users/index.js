import { connect } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import List from "../../components/List";
import userActions from "../../redux/actions/User";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

const UsersPage = ({
  getUsersList,
  usersList,
  totalUsers,
  generatedParams,
  postUser,
  deleteUser,
  putUser,
}) => {
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    getUsersList({}, generatedParams);
  }, [generatedParams]);

  const handleChange = useCallback((e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  });

  const fields = [
    {
      title: "نام کاربری",
      name: "username",
      value: value.username,
    },
    {
      title: "ایمیل",
      name: "email",
      value: value.email,
      type: "email",
    },
    {
      title: "نام",
      name: "firstName",
      value: value.firstName,
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
      value: value.lastName,
    },

    {
      title: "رمز عبور",
      name: "password",
      value: value.password,
      type: "password",
    },
  ];

  return (
    <>
      {modal && (
        <Modal
          title={"افزودن / تغییر ادمین"}
          closeModal={() => {
            setModal(false);
            setValue({
              username: "",
              email: "",
              firstName: "",
              lastName: "",
              password: "",
            });
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (modal?.id) {
                putUser(value, modal?.id);
              } else {
                postUser(value);
              }
            }}
            className="w-full flex flex-col gap-4"
          >
            {fields.map((item) => (
              <Input
                label={item.title}
                name={item.name}
                onChange={handleChange}
                value={item.value}
                type={item?.type ?? "text"}
                required={!modal?.id}
              />
            ))}
            {modal?.id && (
              <p className="text-primary-500 text-sm">
                اگر نمیخواهید رمزعبور را تغییر دهید فیلد آن را خالی بگذارید
              </p>
            )}
            <Button type={"submit"}>تایید و ثبت</Button>
          </form>
        </Modal>
      )}
      <div className="w-full">
        <h1 className="text-white text-2xl"> ادمین ها</h1>

        <List
          addButtonTitle="افزودن ادمین جدید"
          // addButtonLink="/user/add"
          addButtonOnClick={() => setModal(true)}
          // filters={[
          //     {
          //         title: 'صحنه',
          //         list: sceneList,
          //         keyOfOption: 'name',
          //         paramName: 'sceneId'
          //     }
          // ]}
          items={usersList}
          cols={[
            {
              title: "نام کاربری",
              properties: [["username"]],
            },
            {
              title: "نام",
              properties: [["firstName"]],
            },
            {
              title: "نام خانوادگی",
              properties: [["lastName"]],
            },
            {
              title: "ایمیل",
              properties: [["email"]],
            },
          ]}
          totals={totalUsers}
          config={{
            edit: (id) => {
              setModal({
                id: id,
              });
              setValue({
                ...usersList.find((itm) => itm?._id === id),
                password: "",
              });
            },
            delete: async (id) => await deleteUser(id),
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.userState.usersList,
  totalUsers: state.userState.totalUsers,
  generatedParams: state.filterState.generatedParams,
});
const mapDispatchToProps = {
  getUsersList: userActions.getUsersList,
  postUser: userActions.postUser,
  deleteUser: userActions.deleteUser,
  putUser: userActions.putUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
