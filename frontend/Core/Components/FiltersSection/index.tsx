import React, { useEffect, useState } from "react";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { ProductState, PublicState } from "../../Redux/Reducers/reducerTypes";
import { publicActions } from "../../Redux/Actions";
import productActions from "../../Redux/Actions/Products";

const FiltersSection = ({
  generalSetting,
  sellers,
  cityList,
  getSellers,
  staticAttributes,
  getCities,
  getStaticAttributes,
  categoryInfo,
  getProducts,
}: {
  generalSetting: PublicState["generalSetting"];
  sellers: PublicState["sellers"];
  cityList: PublicState["cityList"];
  getSellers: Function;
  getCities: Function;
  staticAttributes: PublicState["staticAttributes"];
  getStaticAttributes: Function;
  categoryInfo: ProductState["categoryInfo"];
  getProducts: Function;
}) => {
  const [filters, setFilters] = useState<any>({
    seller: [],
    priceLte: "",
    priceGte: "",
    search: "",
    att: [],
    city: [],
  });

  useEffect(() => {
    getSellers();
    getCities();
    getStaticAttributes();
  }, []);
  return (
    <div className="w-full border-[2px] border-white p-4 rounded-lg mt-4 text-gray-300">
      <div className="w-full pb-4 border-b border-gray-500">
        <p>جستجو</p>
        <input
          className="w-full mt-3 bg-transparent border border-gray-300 px-4 outline-none rounded-md h-10 text-gray-300"
          placeholder=""
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="w-full pb-4 border-b border-gray-500 mt-4">
        <p>قیمت</p>

        <input
          className="w-full mt-3 bg-transparent border border-gray-300 px-4 outline-none rounded-md h-10 text-gray-300"
          placeholder="از..."
          value={filters.priceLte}
          onChange={(e) => setFilters({ ...filters, priceLte: e.target.value })}
        />
        <input
          className="w-full mt-3 bg-transparent border border-gray-300 px-4 outline-none rounded-md h-10 text-gray-300"
          placeholder="تا..."
          value={filters.priceGte}
          onChange={(e) => setFilters({ ...filters, priceGte: e.target.value })}
        />
      </div>
      <div className="w-full pb-4 border-b border-gray-500 mt-4">
        <p className="mb-4">فروشنده</p>

        <div>
          {sellers.map((seller: any) => (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name={seller?._id}
                className="w-4 h-4 outline-none border-0"
                onChange={(e) =>
                  filters.seller.includes(e.target.name)
                    ? setFilters({
                        ...filters,
                        seller: filters.seller.filter(
                          (itm: string) => itm !== e.target.name
                        ),
                      })
                    : setFilters({
                        ...filters,
                        seller: [...filters.seller, e.target.name],
                      })
                }
              />
              <p>
                {" "}
                {seller.name} - {seller.relatedCity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full pb-4 border-b border-gray-500 mt-4">
        <p className="mb-4">شهر</p>
        <div>
          {cityList.map((city: any) => (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name={city?._id}
                className="w-4 h-4 outline-none border-0"
                onChange={(e) =>
                  filters.city.includes(e.target.name)
                    ? setFilters({
                        ...filters,
                        city: filters.city.filter(
                          (itm: string) => itm !== e.target.name
                        ),
                      })
                    : setFilters({
                        ...filters,
                        city: [...filters.city, e.target.name],
                      })
                }
              />
              <p> {city.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full  mt-4">
        <p className="mb-4">ویژگی</p>
        {staticAttributes.map((sA: any) => (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name={sA?._id}
              className="w-4 h-4 outline-none border-0"
              onChange={(e) =>
                filters.att.includes(e.target.name)
                  ? setFilters({
                      ...filters,
                      att: filters.att.filter(
                        (itm: string) => itm !== e.target.name
                      ),
                    })
                  : setFilters({
                      ...filters,
                      att: [...filters.att, e.target.name],
                    })
              }
            />
            <p> {sA.title}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          let params = {
            relatedCategory: categoryInfo?._id,
            ...filters,
          };
          Object.keys(params).map(
            (item) =>
              (params[item] =
                typeof params[item] === "string"
                  ? params[item]
                  : JSON.stringify(params[item]))
          );
          getProducts(params);
        }}
        className="text-white w-full mt-6 p-2 rounded-lg"
        style={{ background: generalSetting.secondaryColor }}
      >
        اعمال فیلتر ها
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  generalSetting: state.publicState.generalSetting,
  sellers: state.publicState.sellers,
  cityList: state.publicState.cityList,
  staticAttributes: state.publicState.staticAttributes,
  categoryInfo: state.productState.categoryInfo,
});
const mapDispatchToProps = {
  getSellers: publicActions.getSellers,
  getCities: publicActions.getCities,
  getStaticAttributes: publicActions.getStaticAttributes,
  getProducts: productActions.getProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersSection);
