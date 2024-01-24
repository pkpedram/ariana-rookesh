import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "../../../components/Input";
import ImageInput from "../../../components/ImageInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import blogActions from "../../../redux/actions/Blog";
import { useParams } from "react-router-dom";
import Select from "../../../components/Select";
import TextBox from "../../../components/TextBox";

const BlogDetail = ({
  addPost,
  getDetail,
  postDetail,
  editPost,
  getBlogCategories,
  categories,
}) => {
  const [value, setValue] = useState({
    title: "",
    en_title: "",
    content: "",
    en_content: "",
    description: "",
    en_description: "",
    image: null,
    isActive: true,
    relatedBlogCategory: "",
  });

  const { id } = useParams();

  const handleChange = useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value]
  );

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
    getBlogCategories();
  }, [id]);

  useMemo(() => {
    if (postDetail?._id) {
      setValue(postDetail);
    }
  }, [postDetail]);

  return (
    <div className="w-full">
      <Select
        className={"mb-4"}
        items={categories}
        keyOfOption={"title"}
        title={postDetail?.relatedBlogCategory?.title ?? "انتخاب دسته بندی"}
        valueOfOption={"_id"}
        onChange={(e) => setValue({ ...value, relatedBlogCategory: e })}
      />
      <ImageInput
        id={"image"}
        title={"تصویر شاخص"}
        value={value.image}
        onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
        deleteFile={() => setValue({ ...value, image: null })}
      />

      <div className="w-full grid grid-cols-2 gap-8 mt-6">
        <div className="bg-gray-800 w-full rounded-lg flex flex-col gap-3 p-6">
          <h1 className="text-2xl text-white mb-4">فارسی</h1>
          <Input
            placeholder={"عنوان"}
            label={"عنوان"}
            value={value.title}
            name={"title"}
            onChange={handleChange}
          />
          <TextBox
            label={"توضیحات"}
            name={"description"}
            onChange={handleChange}
            value={value.description}
          />
          <p className=" text-gray-200">محتوا</p>
          <ReactQuill
            className="bg-white h-72 rounded-lg overflow-hidden"
            theme="snow"
            value={value.content}
            onChange={(e) => setValue({ ...value, content: e })}
          />
        </div>
        <div className="bg-gray-800 w-full rounded-lg flex flex-col gap-3 p-6">
          <h1 className="text-2xl text-white mb-4">انگلیسی</h1>
          <Input
            placeholder={"title"}
            label={"title"}
            value={value.en_title}
            name={"en_title"}
            onChange={handleChange}
          />
          <TextBox
            label={"description"}
            name={"en_description"}
            onChange={handleChange}
            value={value.en_description}
          />
          <p className="mb-1 mt-6 text-gray-200">Content</p>
          <ReactQuill
            className="bg-white h-72 rounded-lg overflow-hidden"
            theme="snow"
            value={value.en_content}
            onChange={(e) => setValue({ ...value, en_content: e })}
          />
        </div>
      </div>

      <div className="w-full flex justify-end mt-6">
        <div className="w-1/5 gap-2 flex">
          <Button
            onClick={() => {
              let val = value;
              val.isActive = false;
              const formData = new FormData();
              Object.keys(val).map((item) => formData.append(item, val[item]));
              if (id) {
                editPost(formData, id);
              } else {
                addPost(formData);
              }
            }}
            className={"bg-opacity-70"}
          >
            ذخیره در پیشنویس
          </Button>
          <Button
            onClick={() => {
              let val = value;
              val.isActive = true;
              const formData = new FormData();
              Object.keys(val).map((item) => formData.append(item, val[item]));
              if (id) {
                editPost(formData, id);
              } else {
                addPost(formData);
              }
            }}
          >
            تایید و ثبت
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postDetail: state.blogState.postDetail,
  categories: state.blogState.categories,
});
const mapDispatchToProps = {
  addPost: blogActions.addPost,
  getDetail: blogActions.getPostDetail,
  editPost: blogActions.editPost,
  getBlogCategories: blogActions.getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
