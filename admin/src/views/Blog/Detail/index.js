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
import CheckBox from "../../../components/CheckBox";

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
    authorName: "",
    authorDescription: "",
    authorPic: null,
    isImportant: false,
  });

  const [tempSection, setTempSection] = useState({
    title: "",
    en_title: "",
    content: "",
    en_content: "",
    image: null,
  });
  const [sections, setSections] = useState([]);
  const [tempFaq, setTempFaq] = useState({
    title: "",
    en_title: "",
    content: "",
    en_content: "",
  });
  const [faqs, setFaqs] = useState([]);

  const { id } = useParams();

  const handleChange = useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value]
  );
  const handleChangeSection = useCallback((e) => {
    setTempSection({ ...tempSection, [e.target.name]: e.target.value });
  });
  const handleChangeFaq = useCallback((e) => {
    setTempFaq({ ...tempFaq, [e.target.name]: e.target.value });
  });
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
      <div className="bg-gray-800 w-full mt-8 rounded-lg flex flex-col gap-3 p-6">
        <h1 className="text-2xl text-white">اطلاعات نویسنده</h1>
        <ImageInput
          id={"authorPic"}
          title={"تصویر نویسنده"}
          value={value.authorPic}
          onChange={(e) => setValue({ ...value, authorPic: e.target.files[0] })}
          deleteFile={() => setValue({ ...value, authorPic: null })}
        />
        <Input
          label={"نام نویسنده"}
          value={value.authorName}
          name={"authorName"}
          onChange={handleChange}
        />
        <TextBox
          label={"توضیحات نویسنده"}
          value={value.authorDescription}
          name={"authorDescription"}
          onChange={handleChange}
        />
      </div>

      <div className="w-full  mt-10 bg-gray-900 p-8 rounded-xl">
        <div className="w-full mb-6 flex justify-between items-center">
          <h1 className="text-xl text-white">افزودن بخش جدید</h1>
          <Button
            className={"w-max px-8"}
            onClick={() => {
              setSections([...sections, tempSection]);
              setTempSection({
                title: "",
                en_title: "",
                content: "",
                en_content: "",
                image: null,
              });
            }}
          >
            افزودن
          </Button>
        </div>
        <ImageInput
          id={"imageSection"}
          title={"تصویر بخش"}
          value={tempSection.image}
          onChange={(e) =>
            setTempSection({ ...tempSection, image: e.target.files[0] })
          }
          deleteFile={() => setTempSection({ ...tempSection, image: null })}
        />

        <div className="w-full grid grid-cols-2 gap-8 mt-6">
          <div className="bg-gray-800 w-full rounded-lg flex flex-col gap-3 p-6">
            <h1 className="text-2xl text-white mb-4">فارسی</h1>
            <Input
              placeholder={"عنوان"}
              label={"عنوان"}
              value={tempSection.title}
              name={"title"}
              onChange={handleChangeSection}
            />
            <p className="mt-6 text-gray-200">محتوا</p>
            <ReactQuill
              className="bg-white h-72 rounded-lg overflow-hidden"
              theme="snow"
              value={tempSection.content}
              onChange={(e) => setTempSection({ ...tempSection, content: e })}
            />
          </div>
          <div className="bg-gray-800 w-full rounded-lg flex flex-col gap-3 p-6">
            <h1 className="text-2xl text-white mb-4">انگلیسی</h1>
            <Input
              placeholder={"title"}
              label={"title"}
              value={tempSection.en_title}
              name={"en_title"}
              onChange={handleChangeSection}
            />
            <p className="mb-1 mt-6 text-gray-200">Content</p>
            <ReactQuill
              className="bg-white h-72 rounded-lg overflow-hidden"
              theme="snow"
              value={tempSection.en_content}
              onChange={(e) =>
                setTempSection({ ...tempSection, en_content: e })
              }
            />
          </div>
        </div>
        {sections?.map((item, idx) => (
          <div className="w-full my-4 bg-gray-800 p-8 rounded-lg">
            <div className="w-full flex">
              {item?.image && (
                <div className="w-72">
                  <img src={URL.createObjectURL(item.image)} />
                </div>
              )}
              <div className="h-full">
                <h1 className="text-primary-500">{item.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button
                className={"!bg-red-500 w-max px-8"}
                onClick={() =>
                  setSections(sections.filter((itm, i) => i !== idx))
                }
              >
                حذف این بخش
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full  mt-10 bg-gray-900 p-8 rounded-xl">
        <div className="w-full mb-6 flex justify-between items-center">
          <h1 className="text-xl text-white">افزودن سوال متداول جدید</h1>
          <Button
            className={"w-max px-8"}
            onClick={() => {
              setFaqs([...faqs, tempFaq]);
              setTempFaq({
                title: "",
                en_title: "",
                content: "",
                en_content: "",
              });
            }}
          >
            افزودن
          </Button>
        </div>
        <div className="w-full grid grid-cols-2 gap-8 mt-6">
          <div className="bg-gray-800 w-full rounded-lg flex flex-col gap-3 p-6">
            <h1 className="text-2xl text-white mb-4">فارسی</h1>
            <Input
              label={"سوال"}
              value={tempFaq.title}
              name={"title"}
              onChange={handleChangeFaq}
            />
            <TextBox
              label={"پاسخ"}
              value={tempFaq.content}
              name={"content"}
              onChange={handleChangeFaq}
            />
          </div>
          <div className="bg-gray-800 w-full rounded-lg flex flex-col gap-3 p-6">
            <h1 className="text-2xl text-white mb-4">انگلیسی</h1>
            <Input
              label={"Question"}
              value={tempFaq.en_title}
              name={"en_title"}
              onChange={handleChangeFaq}
            />
            <TextBox
              label={"Answer"}
              value={tempFaq.en_content}
              name={"en_content"}
              onChange={handleChangeFaq}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {faqs?.map((item, idx) => (
            <div className="w-full my-4 bg-gray-800 p-8 rounded-lg">
              <div className="w-full flex">
                <div className="h-full">
                  <h1 className="text-primary-500">{item.title}</h1>
                  <p className="text-white">{item.content}</p>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button
                  className={"!bg-red-500 w-max px-8"}
                  onClick={() => setFaqs(faqs.filter((itm, i) => i !== idx))}
                >
                  حذف این سوال
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between mt-6">
        <div className="flex items-center gap-2">
          <CheckBox
            onChange={(e) => setValue({ ...value, isImportant: e })}
            value={value.isImportant}
          />
          <p className="text-primary-500 min-w-max">مقاله مهم</p>
        </div>
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
                addPost(formData, sections, faqs);
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
                addPost(formData, sections, faqs);
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
