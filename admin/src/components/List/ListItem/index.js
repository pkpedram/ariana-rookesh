import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import findObjectValue from "../../../utils/findObjectValue";
import Icon from "../../icon";
import { BsChevronDown } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import CheckBox from "../../CheckBox";

const ListItem = ({
  item,
  cols,
  config,
  setSubListItems,
  subListItems,
  setListItems,
  listItems,
  idx,
  hasSubs,
  subList,
  subsName,
  addSubListOnclick,
  mainPropertyName,
  subCols,
  subConfig,
  rowLink,
  hasSubTable,
  subTableTitle,
  subTableCols,
  subTableList,
  subTableOpen,
  setSubTableOpen,
  hasListChange
}) => {
  const [newCols, setNewCols] = useState(cols);

  const [showSubs, setShowSubs] = useState(false);

  const [timer, setTimer] = useState('00:00')

  let timerCol = item[cols.find(itm => itm?.type == 'timer')?.properties[0][0]]

  useEffect(() => {
    console.log()
    setTimeout(() => {
        let min = Math.floor(((new Date().getTime() - new Date(timerCol)) / 60000))
        let sec = (((new Date().getTime() - new Date(timerCol)) % 60000) / 1000).toFixed(0)

        setTimer(`${sec} : ${min}`)
   
      }, 1000)
  }, [timer])

  const handleCheckBox = (e, item) => {
    if (e === true) {
      setListItems([...listItems, item]);
    } else {
      setListItems(listItems.filter((i) => i.id !== item.id));
    }
  };

  const handleSubCheckBox = (e, item) => {
    if (e == true) {
      setSubListItems([...subListItems, item]);
    } else {
      setSubListItems(subListItems.filter((i) => i.id !== item.id));
    }
  };

  console.log(subListItems);

  useEffect(() => {
    setNewCols(cols?.filter(itm => itm));
  }, [cols]);

  const shoppingCartSteps = [
    {
      title: 'تعیین مقدار',
      id: 0,
    },
    {
      title: 'تماس کارشناس',
      id: 1,
    },
    {
      title: 'انتخاب آدرس',
      id: 2,
    },
    {
      title: 'تعیین وزن',
      id: 3,
    },
    {
      title: 'مرور سفارش',
      id: 4,
    },
  ]

  const SubItem = ({ item, indx }) => {
    return (
      <div className={` w-full px-4 flex items-center justify-between my-2 `}>
        {
          hasListChange && <div className="w-40 py-3">
          {/* <Input type='checkBox' className='w-4' onChange={(e)=>{handleSubCheckBox(e,item.id)}}/> */}
          <CheckBox
            value={subListItems?.find((itm) => itm.id == item.id)}
            onChange={(e) => handleSubCheckBox(e, item)}
          />
        </div>
        }
        <div className={`w-full grid ${subCols?.length ? 'grid-cols-' + subCols?.length : 'grid-cols-6'} grid-rows-1 gap-2`}>
          {subConfig.hasOwnProperty("link") ? (
            <Link
              to={`/${subConfig.linkParent}/${item.id}`}
              className="w-2/3 flex gap-2 items-center text-center text-white justify-between"
            >
              {subCols.map((col, i) => {
                let model = {
                  date: col.properties.map(
                    (property) =>
                      new Date(
                        findObjectValue(item, property)
                      )?.toLocaleDateString("fa-IR") + " "
                  ),
                  price: col.properties.map(
                    (property) =>
                      findObjectValue(item, property)?.toLocaleString("fa-IR") +
                      " ریال " +
                      " "
                  ),
                  default: col.properties.map(
                    (property) => findObjectValue(item, property) + " "
                  ),
                };
                return (
               
                  <p
                    className="ml-3 flex items-center justify-center gap-4"
                    style={{
                      width: col?.isMain
                        ? "100%"
                        : `calc(100% / ${subCols.length} )`,
                    }}
                  >
                    {col.type ? model[col.type] : model.default}{" "}
                    {col?.customText}
                    {/* {col.properties.map(property => findObjectValue(item, property) + ' ')} */}
                  </p>
                );
              })}
            </Link>
          ) : (
            subCols.map((col, i) => {
              let model = {
                date: col.properties.map(
                  (property) =>
                    new Date(
                      findObjectValue(item, property)
                    )?.toLocaleDateString("fa-IR") + " "
                ),
                price: col.properties.map(
                  (property) =>
                    findObjectValue(item, property)?.toLocaleString("fa-IR") +
                    " ریال " +
                    " "
                ),
                default: col.properties.map(
                  (property) => findObjectValue(item, property) + " "
                ),
              };

              //        col.properties.map((itm) => console.log(findObjectValue(item, [...itm]), itm))

              return (
                <p className="flex w-full text-sm items-center justify-center text-white">
                  {col.type ? model[col.type] : model.default} {col?.customText}
                  {/* {col.properties.map(itm => findObjectValue(item, itm) + ' ')} */}
                </p>
              );
            })
          )}
        </div>
        <div
          className={`flex items-center ${
            subList?.length == 0 ? "w-40" : "w-[40rem]"
          }  justify-end `}
        >
          {subConfig?.labels?.map((label) => {
            const types = {
              error: "bg-red-600",
              success: "bg-green-600",
              default: "bg-navy",
            };

            if (typeof label == "object") {
              return label.not
                ? !findObjectValue(item, label.condition) && (
                    <p
                      className={`text-white text-xs p-1 rounded-lg ${
                        label?.type ? types[label.type] : types.default
                      } mx-2`}
                    >
                      {label.title}
                    </p>
                  )
                : findObjectValue(item, label.condition) && (
                    <p
                      className={`text-white text-xs p-1 rounded-lg ${
                        label?.type ? types[label.type] : types.default
                      } mx-2`}
                    >
                      {label.title}
                    </p>
                  );
            }
          })}
          {subConfig.hasOwnProperty("edit") && (
            <Icon
              icon={<FiEdit />}
              title="ویرایش"
              onClick={() => subConfig.edit(item.id)}
            />
          )}
          {subConfig.hasOwnProperty("delete") && (
            <Icon
              icon={<MdOutlineDelete />}
              title="حذف"
              color="text-red-500"
              onClick={() => {
                Swal.fire({
                  title: "آیا مطمئن هستید؟",
                  text: "در صورت حذف نمیتوانید آن را برگردانید!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "بله، حذف کن!",
                  cancelButtonText: "نه، کی گفته",
                }).then((result) => {
                  if (result.isConfirmed) {
                    subConfig.delete(item.id);
                  }
                });
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={` w-full px-4 flex items-center justify-between ${
          idx % 2 !== 0 ? "bg-navyLight" : ""
        } ${hasSubs && "bg-navyLight"} my-2 `}
      >
        {
          hasListChange ? <div className="w-10 py-3">
          {/* <Input type='checkBox' className='w-4' onChange={(e)=>{handleCheckBox(e,item.id)}}/> */}
          <CheckBox
            value={listItems?.find((itm) => itm == item.id)}
            onChange={(e) => handleCheckBox(e, item)}
          />
        </div> : <div className="h-10 w-16 py-3"></div>
        }
        <div className={`w-full grid  ${newCols?.length ? 'grid-cols-' + newCols?.length : 'grid-cols-6'}  grid-rows-1 gap-2`}>
          {config.hasOwnProperty("link") ? 
          
              newCols.map((col, i) => {
                let model = {
                  time: col.properties.map((property) => new Date(findObjectValue(item, property))?.toLocaleTimeString('fa-ir')),
                  date:  col.properties.map(
                    (property) =>
                    findObjectValue(item, property) == "0001-01-01T00:00:00"  ?
                     '-' :
                      new Date(
                        findObjectValue(item, property)
                      )?.toLocaleDateString("fa-IR") + " "
                  ),
                  dateTime: col.properties.map((property) => 
                  new Date(
                    findObjectValue(item, property)
                  )?.toLocaleString("fa-IR") + " "),
                  price: col.properties.map(
                    (property) =>
                      findObjectValue(item, property)?.toLocaleString("fa-IR") +
                      " ریال " +
                      " "
                  ),
                  default: col.properties.map(
                    (property) => findObjectValue(item, property) + " "
                  ),
                };
                return (
                  <Link
                  to={`/${config.linkParent}/${item.id}`}
                  className="w-full flex gap-2 items-center text-center text-white justify-between"
                >
                  <p
                    className="ml-3 w-full flex items-center justify-center gap-4"
                   
                  >
                    {col.type ? model[col.type] : model.default}{" "}
                    {col?.customText}
                    {/* {col.properties.map(property => findObjectValue(item, property) + ' ')} */}
                  </p>
                  </Link>
                );
              }
         
          ) : (
            newCols.map((col, i) => {
              let model = {
                time: col.properties?.map((property) => new Date(findObjectValue(item, property))?.toLocaleTimeString('fa-ir')),
                date:  col.properties?.map(
                  (property) =>
                  findObjectValue(item, property) == "0001-01-01T00:00:00"  ?
                     '-' :
                    new Date(
                      findObjectValue(item, property)
                    )?.toLocaleDateString("fa-IR") + " "
                ),
                dateTime: col.properties?.map((property) => 
                new Date(
                  findObjectValue(item, property)
                )?.toLocaleString("fa-IR") + " "),
                price: col.properties?.map(
                  (property) =>
                    findObjectValue(item, property)?.toLocaleString("fa-IR") +
                    " ریال " +
                    " "
                ),
                default: col.properties?.map(
                  (property) => findObjectValue(item, property) + " "
                ),
                shoppingCartStep: col.properties?.map((property) => shoppingCartSteps?.find((itm, idx) => itm.id == findObjectValue(item, property))?.title),
                timer: timer
              };

              //        col.properties.map((itm) => console.log(findObjectValue(item, [...itm]), itm))

              return (
                <p className="flex w-full text-sm items-center justify-center text-white">
                  {col.type ? model[col.type] : model.default} {col?.customText}
                  {/* {col.properties.map(itm => findObjectValue(item, itm) + ' ')} */}
                </p>
              );
            })
          )}
        </div>
        <div
          className={`flex items-center ${
            subList?.length == 0 ? "w-40" : "w-[40rem]"
          }  justify-end `}
        >
          {}
          {hasSubs && (
            <div className="flex items-center">
              <button
                onClick={() => addSubListOnclick(item.id)}
                className="flex items-center w-max text-white text-xs px-4 py-2 border border-gold3F rounded-md ml-2"
              >
                <p className="ml-2 text-lg">
                  <MdAddCircleOutline />
                </p>
                <p>افزودن {subsName}</p>
              </button>

              {subList?.filter(
                (itm) => findObjectValue(itm, mainPropertyName) == item?.id
              )?.length !== 0 && (
                <button
                  className="bg-gold3F px-4 py-2 text-xs w-max text-white flex items-center rounded-md border border-gold3F"
                  onClick={() => setShowSubs(!showSubs)}
                >
                  <p>{subsName} ها</p>

                  <p className={`mr-2 ${showSubs ? "rotate-180" : ""}`}>
                    <BsChevronDown />
                  </p>
                </button>
              )}
            </div>
          )}
          {config?.labels?.map((label) => {
            const types = {
              error: "bg-red-600",
              success: "bg-green-600",
              default: "bg-navy",
            };

            if (typeof label == "object") {
              return label.not
                ? !findObjectValue(item, label.condition) && (
                    <p
                      className={`text-white text-xs p-1 rounded-lg ${
                        label?.type ? types[label.type] : types.default
                      } mx-2`}
                    >
                      {label.title}
                    </p>
                  )
                : findObjectValue(item, label.condition) && (
                    <p
                      className={`text-white text-xs p-1 rounded-lg ${
                        label?.type ? types[label.type] : types.default
                      } mx-2`}
                    >
                      {label.title}
                    </p>
                  );
            }
          })}
          {config.hasOwnProperty("edit") && (
            <Icon
              icon={<FiEdit />}
              title="ویرایش"
              onClick={() => config.edit(item._id)}
            />
          )}
          {config.hasOwnProperty("delete") && (
            <Icon
              icon={<MdOutlineDelete />}
              title="حذف"
              color="text-red-500"
              onClick={() => {
                Swal.fire({
                  title: "آیا مطمئن هستید؟",
                  text: "در صورت حذف نمیتوانید آن را برگردانید!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "بله، حذف کن!",
                  cancelButtonText: "نه، کی گفته",
                }).then((result) => {
                  if (result.isConfirmed) {
                    config.delete(item._id);
                  }
                });
              }}
            />
          )}
        </div>
      </div>
      {showSubs &&
        subList
          ?.filter((itm) => findObjectValue(itm, mainPropertyName) == item?.id)
          ?.map((subItem, indx) => <SubItem item={subItem} indx={idx} />)}
    </>
  );
};


export default ListItem;