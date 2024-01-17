import React, { useEffect, useMemo, useState } from "react";
import { RootState } from "../../../Redux/store";
import { connect } from "react-redux";
import { filterActions } from "../../../Redux/Actions";
import {
  ProductListItem,
  Publisher,
} from "../../../Redux/Reducers/reducerTypes";
import Select from "../../Select";
import { IoCloseCircle } from "react-icons/io5";

type PublisherFiltersProps = {
  publisherList: Array<Publisher>;
  generateCustomFilters: Function;
  productList: Array<ProductListItem>;
  savedCustomFilter: string
};

const PublisherFilters = ({
  publisherList,
  generateCustomFilters,
  productList,
  savedCustomFilter
}: PublisherFiltersProps) => {
  const [selectedPublishers, setSelectedPublishers] = useState<
    Array<Publisher | undefined>
  >([]);
  const [selectValue, setSelectValue] = useState('')

  const selectPublisher = (e: any) => {
      setSelectValue(e.target.value)
    if (
      !selectedPublishers.find((itm) => itm?.id == e.target.value) &&
      e.target.value.length !== 0
    ) {
      setSelectedPublishers([
        ...selectedPublishers,
        publisherList.find((itm) => itm.id == e.target.value),
      ]);
    }
  };

  useEffect(() => {
    if (selectedPublishers.length !== 0) {
      generateCustomFilters({
        actionType: "SET_PUBLISHER_FILTER",
        data: selectedPublishers,
      });
      if(savedCustomFilter.length !== 0){
        generateCustomFilters({actionType: savedCustomFilter})
      }
    }
  }, [selectedPublishers, productList, savedCustomFilter]);

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-4">
      <Select
      value={selectValue}
        list={publisherList}
        keyOfOption="title"
        valueOfOption="id"
        title="انتشارات"
        onChange={selectPublisher}
      />
      <div className="flex flex-wrap gap-4">
        {selectedPublishers.map((item) => (
          <div className="h-10 px-2 rounded-md bg-white flex items-center gap-2">
            <p>{item?.title}</p>
            <p
              className="text-xl cursor-pointer"
              onClick={() =>{
                if(selectedPublishers.filter((itm) => itm?.id !== item?.id)){
                    generateCustomFilters({
                        actionType: "SET_PUBLISHER_FILTER",
                        data: [],
                      });
                }
                setSelectedPublishers(
                  selectedPublishers.filter((itm) => itm?.id !== item?.id)
                )
              }}
            >
              <IoCloseCircle />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  publisherList: state.productState.publisherList,
  productList: state.productState.productList,
});
const mapDispatchToProps = {
  generateCustomFilters: filterActions.generateCustomFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherFilters);
