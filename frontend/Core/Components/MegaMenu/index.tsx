import React, { useEffect, useState } from "react";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import productActions from "../../Redux/Actions/Products";
import { Category } from "../../Redux/Reducers/reducerTypes";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";

const MegaMenu = ({
  getCategories,
  categories,
  lan,
}: {
  getCategories: Function;
  categories: Array<Category>;
  lan: boolean;
}) => {
  const [cats, setCats] = useState<any>([]);
  const [openSub, setOpenSub] = useState<any>(false);
  const [openSubSub, setOpenSubSub] = useState<any>(false);
  const router = useRouter();
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length) {
      let parentCats = categories.filter((itm) => !itm?.parent);

      const output = parentCats.map((item) => ({
        ...item,
        subCats: categories
          .filter((itm) => itm.parent?._id === item._id)
          .map((itm) => ({
            ...itm,
            subCats: categories.filter((s) => s?.parent?._id === itm?._id),
          })),
      }));

      setCats(output);
    }
  }, [categories]);

  console.log(cats);

  return (
    <div className="w-full absolute top-full pt-4">
      <div className="min-w-max bg-white p-4 flex flex-col gap-3 ">
        {cats.map((item: any) => (
          <div className="cursor-pointer w-full flex items-center justify-between ">
            <p
              onClick={() => {
                if (item.subCats?.length !== 0) {
                  setOpenSub(openSub === item?._id ? false : item?._id);
                } else {
                  router.push(`/products/${item?.slug}`);
                }
              }}
            >
              {lan ? item.en_name : item.name}
            </p>
            {item.subCats?.length !== 0 && (
              <BiChevronLeft
                onClick={() => {
                  if (item.subCats?.length !== 0) {
                    setOpenSub(openSub === item?._id ? false : item?._id);
                  } else {
                    router.push(`/products/${item?.slug}`);
                  }
                }}
              />
            )}
            {openSub === item?._id && item.subCats?.length !== 0 && (
              <div className="min-w-max bg-white p-4 flex flex-col gap-3 absolute right-full">
                <div className="cursor-pointer w-full flex items-center justify-between text-xs text-gray-500">
                  <p
                    onClick={() => {
                      router.push(`/products/${item?.slug}`);
                    }}
                  >
                    {lan ? "View All" : "نمایش همه"}
                  </p>
                </div>
                {item.subCats.map((subCat: any) => (
                  <div className="cursor-pointer w-full flex items-center justify-between ">
                    <p
                      onClick={() => {
                        if (subCat.subCats?.length !== 0) {
                          setOpenSubSub(
                            openSubSub === subCat?._id ? false : subCat?._id
                          );
                        } else {
                          router.push(`/products/${item?.slug}`);
                        }
                      }}
                    >
                      {lan ? subCat.en_name : subCat.name}
                    </p>
                    {subCat.subCats?.length !== 0 && <BiChevronLeft />}
                    {openSubSub === subCat._id &&
                      subCat.subCats?.length !== 0 && (
                        <div className="min-w-max bg-white p-4 flex flex-col gap-3 absolute right-full">
                          <div className="cursor-pointer w-full flex items-center justify-between text-xs text-gray-500">
                            <p
                              onClick={() => {
                                router.push(`/products/${subCat?.slug}`);
                              }}
                            >
                              {lan ? "View All" : "نمایش همه"}
                            </p>
                          </div>
                          {subCat.subCats.map((subsubCat: any) => (
                            <div className="cursor-pointer w-full flex items-center justify-between relative">
                              <p
                                onClick={() => {
                                  router.push(`/products/${subsubCat?.slug}`);
                                }}
                              >
                                {lan ? subsubCat.en_name : subsubCat.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  categories: state.productState.categories,
  lan: state.publicState.lan,
});
const mapDispatchToProps = {
  getCategories: productActions.getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
