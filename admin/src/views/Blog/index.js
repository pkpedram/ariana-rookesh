import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import blogActions from "../../redux/actions/Blog";
import { useNavigate } from "react-router-dom";
import List from "../../components/List";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ImageInput from "../../components/ImageInput";

const BlogList = ({
  getBlogPosts,
  postsList,
  totalPostsList,
  getCategories,
  categories,
  totalCategories,
  deleteCategory,
  deletePost,
  editCategory,
  addCategory,
}) => {
  const [catModal, setCatModal] = useState(false);
  useEffect(() => {
    getBlogPosts();
    getCategories();
  }, []);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [value, setValue] = useState({
    title: "",
    en_title: "",
    image: null,
    isActive: true,
  });

  const handleChange = useCallback((e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  });

  return (
    <div>
      {catModal && (
        <Modal
          closeModal={() => {
            setCatModal(false);
            setValue({
              title: "",
              en_title: "",
              image: null,
              isActive: true,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر دسته بندی</h1>
            <Input
              name={"title"}
              placeholder={"عنوان"}
              onChange={handleChange}
              value={value.title}
            />
            <Input
              name={"en_title"}
              placeholder={"عنوان انگلیسی"}
              onChange={handleChange}
              value={value.en_title}
            />
            <div className="h-72">
              <ImageInput
                name={"image"}
                title={"تصویر"}
                value={value.image}
                onChange={(e) =>
                  setValue({ ...value, image: e.target.files[0] })
                }
                deleteFile={(e) => setValue({ ...value, image: null })}
                id={"cat_image"}
                className={"!max-h-[13rem]"}
              />
            </div>
            <Button
              onClick={() => {
                const formData = new FormData();
                Object.keys(value).map((item) =>
                  formData.append(item, value[item])
                );
                if (catModal?._id) {
                  editCategory(formData, catModal?._id);
                } else {
                  addCategory(formData);
                }
                setCatModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}
      <h1 className="text-white text-2xl">پست های بلاگ</h1>

      <List
        addButtonTitle="افزودن پست جدید"
        addButtonLink="/blog/add"
        items={postsList}
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
            title: "title",
            properties: [["en_title"]],
          },
          {
            title: "منتشر شده",
            properties: [["isActive"]],
          },
        ]}
        totals={totalPostsList}
        config={{
          edit: (id) => navigate(`/blog/${id}`),
          delete: async (id) => await deletePost(id),
        }}
      />
      <h1 className="text-white text-2xl mt-8">دسته بندی های بلاگ</h1>

      <List
        addButtonOnClick={() => setCatModal(true)}
        addButtonTitle="افزودن دسته بندی جدید"
        items={categories}
        totals={totalCategories}
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
            setCatModal({ _id: id });
            setValue(categories?.find((itm) => itm?._id == id));
          },
          delete: async (id) => await deleteCategory(id),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  postsList: state.blogState.postsList,
  totalPostsList: state.blogState.totalPostsList,
  categories: state.blogState.categories,
  totalCategories: state.blogState.totalCategories,
});
const mapDispatchToProps = {
  getBlogPosts: blogActions.getPostList,
  getCategories: blogActions.getCategories,
  editCategory: blogActions.editCategory,
  deletePost: blogActions.deletePost,
  deleteCategory: blogActions.deleteCategory,
  addCategory: blogActions.addCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
