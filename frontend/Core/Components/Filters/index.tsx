import React, { useEffect, useMemo, useState } from "react";
import Select from "../Select";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { filterActions } from "../../Redux/Actions";
import { CustomFilterType } from "../../Redux/Actions/actionTypes";
import { ProductListItem } from "../../Redux/Reducers/reducerTypes";
import PublisherFilters from "./PublisherFilters";

type filterProps = {
  orderingList: Array<object>;
  generateParams: Function;
  productCustomFilters: Array<CustomFilterType>;
  generateCustomFilters: Function;
  nextOffset: string;
  ordering: string;
  filteredProducts: Array<ProductListItem>;
};

const Filters = ({
  orderingList,
  generateParams,
  productCustomFilters,
  filteredProducts,
  generateCustomFilters,
  nextOffset,
  ordering,
}: filterProps) => {
  const [savedCustomFilter, setSavedCustomFilter] = useState("");


  useMemo(() => {
    if (savedCustomFilter.length !== 0) {
      generateCustomFilters({ actionType: savedCustomFilter });
    }
  }, [nextOffset]);

  return (
    <div className="w-full max-w-[75rem] mx-auto flex flex-col gap-4 mb-6">
      <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-4">
        <Select
          value={ordering}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            generateParams({ order: e.target.value })
          }
          title="نحوه اوردرینگ از بک"
          list={orderingList}
          keyOfOption="title"
          valueOfOption="id"
        />
        <Select
          value={savedCustomFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            generateCustomFilters({ actionType: e.target.value });
            setSavedCustomFilter(e.target.value);
          }}
          title="نحوه اوردرینگ از فرانت"
          list={productCustomFilters}
          keyOfOption="title"
          valueOfOption="actionType"
        />
      </div>

      <PublisherFilters savedCustomFilter={savedCustomFilter} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  orderingList: state.filterState.orderingList,
  productCustomFilters: state.filterState.customFilters.products,
  nextOffset: state.filterState.nextOffset,
  ordering: state.productState.ordering,
  filteredProducts: state.productState.filteredProducts,
});
const mapDispatchToProps = {
  generateParams: filterActions.generateParams,
  generateCustomFilters: filterActions.generateCustomFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
