import React, { useState } from "react";
import Select from "../Select";

import ListItem from "./ListItem";

import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { filterActions } from "../../redux/actions";
import { connect } from "react-redux";
import CheckBox from "../CheckBox";

//DATE FILTER

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const List = ({
  items,
  cols,
  rowLink,
  config,
  subCols,
  subConfig,
  changeList,
  addButton = true,
  addButtonTitle = "",
  addButtonLink = "",
  filters,
  totals,
  generateParams,
  addButtonOnClick,
  subList,
  hasSubs = false,
  mainPropertyName,
  subsName,
  addSubListOnclick,
  hasSubTable,
  subTableTitle,
  subTableList,
  subTableCols,
  hasListChange = true,
  searches = [],
  fromDateToDate = false,
}) => {
  const [listItems, setListItems] = useState([]);
  const [subListItems, setSubListItems] = useState([]);
  const [changeSelectValue, setChangeSelectValue] = useState(null);

  const [activePage, setActivePage] = useState(1);

  const [subTableOpen, setSubTableOpen] = useState(false);

  console.log("listItems", listItems);

  //    console.log('cols',cols)
  //    console.log('items',items)
  let newCols = cols;

  const CostumeDatePickerInput = ({
    openCalendar,
    value,
    handleValueChange,
    title,
  }) => {
    return (
      <input
        onFocus={openCalendar}
        value={value}
        onChange={handleValueChange}
        placeholder={title}
        className="border border-gold3F p-2 bg-transparent px-2 text-white rounded outline-none"
      />
    );
  };
  console.log(
    items?.filter((item, idx) => idx >= 0 && typeof item == "object")
  );
  return (
    <div className="w-full bg-gray-900 mt-8 shadow-xl p-6 rounded-xl">
      <div className="w-full flex items-center justify-between mb-10">
        <div>
          {addButton && (
            <Link
              onClick={addButtonOnClick}
              to={addButtonLink}
              className="flex items-center justify-between px-4 py-2 rounded-md bg-primary-700 text-white"
            >
              <p className="text-xl ml-3">
                <MdAddCircleOutline />
              </p>
              <p className="text-xs">{addButtonTitle}</p>
            </Link>
          )}
        </div>
        {hasListChange && (
          <div className="flex items-center">
            <Select
              keyOfOption={"title"}
              items={changeList}
              // className='!w-2/5'
              width={"w-72"}
              title={"انتخاب تغییر دسته جمعی..."}
              onChange={(e) => {
                setChangeSelectValue(e);
              }}
            />
            <button
              className={`px-4 py-2  text-white ${
                listItems.length == 0 && subListItems.length == 0
                  ? "bg-navyLight"
                  : "bg-gold3F"
              } rounded-md`}
              onClick={() => {
                changeList.map((itm) => {
                  if (itm.id === changeSelectValue) {
                    itm.submitFunction(listItems, subListItems);
                  }
                });
              }}
            >
              انجام عملیات
            </button>
          </div>
        )}
      </div>

      {filters?.length !== 0 && (
        <div className="w-full flex flex-wrap mb-4 gap-2">
          {filters?.map((item) => (
            <Select
              items={[
                { _id: "", [item.keyOfOption]: " همه " + " " + item.title },
                ...item?.list,
              ]}
              className="w-max !rounded !mx-0"
              title={"انتخاب " + item.title}
              keyOfOption={item.keyOfOption}
              keyOfOptionList={item.keyOfOptionList}
              onChange={(e) =>
                item.onClick
                  ? item.onClick(e)
                  : generateParams({ [item.paramName]: e })
              }
            />
          ))}
          {searches?.map((item) => (
            <input
              placeholder={item?.placeholder}
              className={` border border-primary-500 bg-transparent p-2 text-white rounded outline-none`}
              type="search"
              onChange={(e) => {
                if (e.target.value.length == 0) {
                  generateParams({ [item.paramName]: "" });
                }
                if (e.target.value.length >= 3) {
                  generateParams({ [item.paramName]: e.target.value });
                }
              }}
            />
          ))}
          {fromDateToDate && (
            <>
              <div className="">
                <DatePicker
                  // value={new Date(valuetimers.fromDate)}
                  calendar={persian}
                  format="YYYY/MM/DD"
                  locale={persian_fa}
                  render={
                    <CostumeDatePickerInput
                      title="از تاریخ"
                      handleValueChange={(e) => console.log("Date Input", e)}
                    />
                  }
                  className={`border-1 rmdp-mobile rmdp-filter`}
                  onChange={(e) =>
                    generateParams({ fromDate: new Date(e).toJSON() })
                  }
                />
              </div>
              <div className="">
                <DatePicker
                  // value={new Date(valuetimers.fromDate)}
                  calendar={persian}
                  format="YYYY/MM/DD"
                  locale={persian_fa}
                  render={
                    <CostumeDatePickerInput
                      title="تا تاریخ"
                      handleValueChange={(e) => console.log("Date Input", e)}
                    />
                  }
                  className={`border-1 rmdp-mobile rmdp-filter`}
                  onChange={(e) =>
                    generateParams({ toDate: new Date(e).toJSON() })
                  }
                />
              </div>
            </>
          )}
        </div>
      )}

      <div className="p-3 w-full flex  items-start justify-between bg-gray-800 shadow-lg rounded border border-[#ACACAC] my-2">
        {hasListChange ? (
          <div className="w-10">
            {/* <Input type='checkBox' className='w-4' onChange={(e)=>{handleCheckBox(e,item.id)}}/> */}
            <CheckBox
              value={listItems?.length == items?.length}
              onChange={(e) => {
                if (e == true) {
                  setListItems(items.map((item) => item));
                } else {
                  setListItems([]);
                }
              }}
            />
          </div>
        ) : (
          <div className="h-10 w-16 py-3"></div>
        )}
        {/* <div className='w-2/3 flex items-center text-center text-white justify-between'>
        {
           cols.map(col => (
            <>
                <p className='ml-12 text-center mr-1' style={{
                    width: col?.isMain ? '100%' : `calc(100% / ${cols.length} )`
                }}  key={`LIST_ITEM__${col.title}`}>{col.title}</p>
                
            </>
        ))
        }
          </div> */}

        <div
          className={`w-full grid ${
            cols?.filter((itm) => itm).length
              ? "grid-cols-" + cols?.filter((itm) => itm).length
              : "grid-cols-6"
          } gap-2 grid-rows-1 `}
        >
          {cols
            ?.filter((itm) => itm)
            .map((col) => (
              <p className="text-center text-gold3F ">{col.title}</p>
            ))}
        </div>

        <div
          className={` ${subList?.length == 0 ? "w-40" : "w-[40rem]"}`}
        ></div>
      </div>

      {items
        .filter((item, idx) => idx >= 0 && typeof item == "object")
        ?.map((item, index) => (
          <>
            <ListItem
              hasListChange={hasListChange}
              rowLink={rowLink}
              subListItems={subListItems}
              setSubListItems={setSubListItems}
              subCols={subCols}
              subConfig={subConfig}
              addSubListOnclick={addSubListOnclick}
              subList={subList}
              subsName={subsName}
              mainPropertyName={mainPropertyName}
              hasSubs={hasSubs}
              idx={index}
              cols={newCols}
              properties={cols.map((item) => [item.properties])}
              config={config}
              item={item}
              key={`LIST_ITEM__${index}`}
              setListItems={setListItems}
              listItems={listItems}
              hasSubTable={hasSubTable}
              subTableTitle={subTableTitle}
              subTableCols={subTableCols}
              subTableList={subTableList}
              subTableOpen={subTableOpen}
              setSubTableOpen={setSubTableOpen}
            />
          </>
        ))}

      <Pagination
        currentPage={activePage}
        setCurrentPage={setActivePage}
        postsPerPage={10}
        totalPosts={totals !== 0 ? totals : 10}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  generateParams: filterActions.generateParams,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

List.defaultProps = {
  // cols: [
  //     {
  //         title: 'سالام',
  //         properties: [['user', 'firstName'], ['user', 'lastName']],

  //     }
  // ],

  config: {
    // edit: () => null,
    // delete: () => null,
    // labels: [{
    //     title: 'غیرفعال',
    //     type: 'error',
    //     condition: 'isActive',
    //     not: false
    // },
    // {
    //     title: 'جدید',
    //     type: 'success',
    //     condition: 'isActive',
    //     not: true
    // },
    // {
    //     title: 'همینجوری',
    //     condition: ['isActive'],
    //     not: false
    // },
    // ],

    linkParent: "orders",
  },
};

// filters data model = [
//     {
//         title: '',
//         list: [],
//         keyOfOption: '',
//         paramName: '',

//     }
// ]
