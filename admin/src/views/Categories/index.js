import React, { useCallback, useEffect, useState } from "react";
import List from "../../components/List";
import { connect } from "react-redux";
import productActions from "../../redux/actions/Products";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import Button from "../../components/Button";
import PdfInput from "../../components/PdfInput";
import CheckBox from "../../components/CheckBox";
import { publicActions } from "../../redux/actions";

const Categories = ({
  getProductCategory,
  productCategories,
  productCategoriesCount,
  deleteProductCategory,
  editProductCategory,
  addProductCategory,
  contactCategories,
  contactCategoriesCount,
  getContactCategory,
  addContactCategory,
  editContactCategory,
  deleteContactCategory,
}) => {
  const [productCatModal, setProductCatModal] = useState(false);
  const [productCatValue, setProductCatValue] = useState({
    banner: null,
    icon: null,
    name: "",
    en_name: "",
    showOnHomePage: false,
    slug: "",
    showProductPrices: false,
    catalog: null,
  });

  const [contactCatModal, setContactCatModal] = useState(false);
  const [contactCatValue, setContactCatValue] = useState({
    title: "",
    en_title: "",
    ordering: 0,
    isActive: true,
  });
  useEffect(() => {
    getProductCategory();
    getContactCategory();
  }, []);

  const handleChange = useCallback((e) => {
    setProductCatValue({ ...productCatValue, [e.target.name]: e.target.value });
  });

  const handleChangeContact = useCallback((e) => {
    setContactCatValue({ ...contactCatValue, [e.target.name]: e.target.value });
  });
  return (
    <>
      {productCatModal && (
        <Modal
          closeModal={() => {
            setProductCatModal(false);
            setProductCatValue({
              banner: null,
              icon: null,
              name: "",
              en_name: "",
              showOnHomePage: false,
              slug: "",
              showProductPrices: false,
              catalog: null,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر دسته بندی</h1>
            <Input
              name={"name"}
              label={"عنوان"}
              onChange={handleChange}
              value={productCatValue.name}
            />
            <Input
              name={"en_name"}
              label={"عنوان انگلیسی"}
              onChange={handleChange}
              value={productCatValue.en_name}
            />
            <Input
              name={"slug"}
              label={"لینک یکتا"}
              onChange={handleChange}
              value={productCatValue.slug}
            />
            <div className="h-72">
              <ImageInput
                name={"icon"}
                title={"آیکون"}
                value={productCatValue.icon}
                onChange={(e) =>
                  setProductCatValue({
                    ...productCatValue,
                    icon: e.target.files[0],
                  })
                }
                deleteFile={(e) =>
                  setProductCatValue({ ...productCatValue, icon: null })
                }
                id={"cat_image"}
                className={"!max-h-[13rem]"}
              />
            </div>
            <div className="h-72">
              <ImageInput
                name={"banner"}
                title={"بنر"}
                value={productCatValue.banner}
                onChange={(e) =>
                  setProductCatValue({
                    ...productCatValue,
                    banner: e.target.files[0],
                  })
                }
                deleteFile={(e) =>
                  setProductCatValue({ ...productCatValue, banner: null })
                }
                id={"banner"}
                className={"!max-h-[13rem]"}
              />
            </div>
            <div className="h-96">
              <PdfInput
                name={"catalog"}
                title={"کاتالوگ"}
                value={productCatValue.catalog}
                onChange={(e) =>
                  setProductCatValue({
                    ...productCatValue,
                    catalog: e.target.files[0],
                  })
                }
                deleteFile={(e) =>
                  setProductCatValue({ ...productCatValue, catalog: null })
                }
                id={"catalog"}
                className={"!max-h-[13rem]"}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="w-full flex items-center gap-2">
                <CheckBox
                  value={productCatValue.showOnHomePage}
                  onChange={(e) =>
                    setProductCatValue({
                      ...productCatValue,
                      showOnHomePage: e,
                    })
                  }
                />
                <p className="text-primary-500 text-lg">نمایش در صفحه اصلی</p>
              </div>
              <div className="w-full flex items-center gap-2">
                <CheckBox
                  value={productCatValue.showProductPrices}
                  onChange={(e) =>
                    setProductCatValue({
                      ...productCatValue,
                      showProductPrices: e,
                    })
                  }
                />
                <p className="text-primary-500 text-lg">نمایش قیمت محصولات</p>
              </div>
            </div>
            <Button
              onClick={() => {
                const formData = new FormData();
                Object.keys(productCatValue).map((item) =>
                  formData.append(item, productCatValue[item])
                );
                if (productCatModal?._id) {
                  editProductCategory(formData, productCatModal?._id);
                } else {
                  addProductCategory(formData);
                }
                setProductCatModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}

      {contactCatModal && (
        <Modal
          closeModal={() => {
            setContactCatModal(false);
            setContactCatValue({
              title: "",
              en_title: "",
              ordering: 0,
              isActive: true,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن / تغییر دسته بندی</h1>
            <Input
              name={"title"}
              label={"عنوان"}
              onChange={handleChangeContact}
              value={contactCatValue.title}
            />
            <Input
              name={"en_title"}
              label={"عنوان انگلیسی"}
              onChange={handleChangeContact}
              value={contactCatValue.en_title}
            />
            <Input
              name={"ordering"}
              label={"ترتیب"}
              onChange={handleChangeContact}
              value={contactCatValue.ordering}
            />
            <Button
              onClick={() => {
                if (contactCatModal?._id) {
                  editContactCategory(contactCatValue, contactCatModal?._id);
                } else {
                  addContactCategory(contactCatValue);
                }
                setContactCatModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}
      <div className="w-full">
        <h1 className="text-2xl text-white">دسته بندی های محصولات</h1>
        <List
          addButtonOnClick={() => setProductCatModal(true)}
          addButtonTitle="افزودن دسته بندی محصول"
          items={productCategories}
          totals={productCategoriesCount}
          cols={[
            {
              title: "شناسه",
              properties: [["_id"]],
            },
            {
              title: "عنوان",
              properties: [["name"]],
            },
            {
              title: "عنوان انگلیسی",
              properties: [["en_name"]],
            },
            {
              title: "نمایش در صفحه اصلی",
              properties: [["showOnHomePage"]],
            },
            {
              title: "نمایش قیمت",
              properties: [["showProductPrices"]],
            },
          ]}
          config={{
            edit: (id) => {
              setProductCatModal({ _id: id });
              setProductCatValue(
                productCategories?.find((itm) => itm?._id == id)
              );
            },
            delete: async (id) => await deleteProductCategory(id),
          }}
        />

        <h1 className="text-2xl text-white mt-8">دسته بندی های فرم تماس</h1>
        <List
          addButtonOnClick={() => setContactCatModal(true)}
          addButtonTitle="افزودن دسته بندی فرم تماس"
          items={contactCategories}
          totals={contactCategoriesCount}
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
            {
              title: "ترتیب",
              properties: [["ordering"]],
            },
          ]}
          config={{
            edit: (id) => {
              setContactCatModal({ _id: id });
              setContactCatValue(
                contactCategories?.find((itm) => itm?._id == id)
              );
            },
            delete: async (id) => await deleteContactCategory(id),
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  productCategories: state.productState.categories,
  productCategoriesCount: state.productState.categoriesCount,
  contactCategories: state.publicState.contactCategories,
  contactCategoriesCount: state.publicState.contactCategoriesCount,
});
const mapDispatchToProps = {
  getProductCategory: productActions.getProductCategory,
  deleteProductCategory: productActions.deleteProductCategory,
  editProductCategory: productActions.editProductCategory,
  addProductCategory: productActions.addProductCategory,
  getContactCategory: publicActions.getContactUsCategories,
  addContactCategory: publicActions.addContactCateogory,
  editContactCategory: publicActions.editContactCategory,
  deleteContactCategory: publicActions.deleteContactCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
