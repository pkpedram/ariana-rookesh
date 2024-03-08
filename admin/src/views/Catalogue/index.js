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
import TextBox from "../../components/TextBox";

const CatalougePage = ({
  catalogueList,
  catalogueListCount,
  getCatalogueList,
  addCatalogue,
  deleteCatalogue,
}) => {
  const [productCatModal, setProductCatModal] = useState(false);
  const [productCatValue, setProductCatValue] = useState({
    title: "",
    en_title: "",
    file: null,
  });

  useEffect(() => {
    getCatalogueList();
  }, []);

  const handleChange = useCallback((e) => {
    setProductCatValue({ ...productCatValue, [e.target.name]: e.target.value });
  });
  return (
    <>
      {productCatModal && (
        <Modal
          closeModal={() => {
            setProductCatModal(false);
            setProductCatValue({
              title: "",
              en_title: "",
              file: null,
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white">افزودن کاتالوگ</h1>
            <Input
              name={"title"}
              label={"عنوان"}
              onChange={handleChange}
              value={productCatValue.title}
            />
            <Input
              name={"en_title"}
              label={"عنوان انگلیسی"}
              onChange={handleChange}
              value={productCatValue.en_title}
            />
            <div className="h-96">
              <PdfInput
                name={"file"}
                title={"کاتالوگ"}
                value={productCatValue.file}
                onChange={(e) =>
                  setProductCatValue({
                    ...productCatValue,
                    file: e.target.files[0],
                  })
                }
                deleteFile={(e) =>
                  setProductCatValue({ ...productCatValue, file: null })
                }
                id={"catalog"}
                className={"!max-h-[13rem]"}
              />
            </div>
            <Button
              onClick={() => {
                const formData = new FormData();
                Object.keys(productCatValue).map((item) =>
                  formData.append(item, productCatValue[item])
                );
                addCatalogue(formData);
                setProductCatModal(false);
              }}
            >
              ثبت
            </Button>
          </div>
        </Modal>
      )}
      <div className="w-full">
        <h1 className="text-2xl text-white"> کاتالوگ ها </h1>
        <List
          addButtonOnClick={() => setProductCatModal(true)}
          addButtonTitle="افزودن کاتالوگ جدید"
          items={catalogueList}
          totals={catalogueListCount}
          cols={[
            {
              title: "عنوان",
              properties: [["title"]],
            },
            {
              title: "title",
              properties: [["en_title"]],
            },
          ]}
          config={{
            delete: async (id) => await deleteCatalogue(id),
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  catalogueList: state.publicState.catalogueList,
  catalogueListCount: state.publicState.catalogueListCount,
});
const mapDispatchToProps = {
  getCatalogueList: publicActions.getCatalogueList,
  addCatalogue: publicActions.addCatalogue,
  deleteCatalogue: publicActions.deleteCatalogue,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalougePage);
