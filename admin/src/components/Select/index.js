import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import findObjectValue from "../../utils/findObjectValue";

const Select = ({
  product,
  items,
  keyOfOption,
  keyOfOptionList = [],
  onChange,
  valueOfOption,
  title,
  width,
  className,
  hasSearch
}) => {
  const [showItems, setShowItems] = useState(false);
  const [ShownItems, setShownItems] = useState([])
  const [choosedOption, setChoosedOption] = useState(null);
  const [search, setSearch] = useState('');
  useEffect(() => {
   if(search.length >= 2){
    let list = product ? items.filter(item => 
      item?.productSubCategory?.productMainCategory?.name.indexOf(search) !== -1 ||
      item?.productSubCategory?.name.indexOf(search) !== -1 ||
      item?.productCompany?.name.indexOf(search) !== -1
      ) : items.filter(
        (itm) =>
          itm[keyOfOption].indexOf(search) !== -1
      );
     
      setShownItems(list)
   }else {
    setShownItems(items)
   }
        
  }, [search])
  


  return (
    
    <div
      className={`${className} min-w-max border-solid border border-gold3F flex flex-col items-center ${width} relative  h-fit rounded-md  bg-opacity `}
    >
      <div
        className="w-full flex items-center cursor-pointer text-white px-4 py-2 justify-between"
        onClick={() => setShowItems(!showItems)}
      >
        <p className="w-full">{choosedOption ? choosedOption : title}</p>
        <p className={`font-bold text-xl ${showItems && "rotate-180"}`}>
          <BsChevronDown />
        </p>
      </div>
      <div
        className={`w-full flex flex-col h-fit  max-h-40
         overflow-y-scroll
          absolute top-16
         
          z-50
           bg-gray-800 text-white  rounded-lg
        transition-all ease-in duration-300 easy

         ${
           showItems
             ? `h-40 opacity-100  shadow-lg  border border-primary-500 py-3`
             : "h-0 border-0 opacity-0 hidden"
         }
         `}
      >

        {
            hasSearch && 
        <input type='search' className=" outline-none px-4 py-2 border-b bg-navyLight border-gold3F" placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)}/>
        
        }
        {
        search.length >= 2 ? 
        ShownItems.map((item, index) => (
          <p
            className={`w-full min-w-max ${
              index !== 0 && "border-t"
            } cursor-pointer py-1 px-4 text-gold3F  hover:bg-gray-900 hover:bg-opacity-10`}
            onClick={() => {
              setChoosedOption(product ?   `${item.productSubCategory.productMainCategory.name} ${item.productSubCategory.name} ${item.thickness} میل - ${item.productCompany.name} - ${item.city.name}` 
              : 
              (keyOfOptionList?.length !== 0 ? keyOfOptionList?.filter(itm => itm)?.map((itm, idx) => (findObjectValue(item, itm?.properties,)  + (itm?.customText ? itm.customText : '') + (idx == keyOfOptionList?.length - 1 ? '' : ' - '))) :  item[keyOfOption])
              );
              setShowItems(false);
              onChange(item[valueOfOption]);
            }}
          >
            {product ?   `${item.productSubCategory.productMainCategory.name} ${item.productSubCategory.name} ${item.thickness} میل - ${item.productCompany.name} - ${item.city.name}` :item[keyOfOption]}
          </p>
        )) : 
        items?.map((item, index) => (
          <p
            className={`w-full ${
              index !== 0 && "border-t"
            } cursor-pointer py-1 px-4 text-gold3F hover:bg-gray-900 hover:bg-opacity-10`}
            onClick={() => {
              setChoosedOption(product ?   `${item.productSubCategory.productMainCategory.name} ${item.productSubCategory.name} ${item.thickness} میل - ${item.productCompany.name} - ${item.city.name}` : 
              (keyOfOptionList?.length !== 0 ? keyOfOptionList?.filter(it => typeof it === 'object')?.map((itm, idx) => (findObjectValue(item, itm?.properties)  + (itm?.customText ? itm.customText : '') + (idx == keyOfOptionList?.length - 1 ? '' : ' - '))) :  item[keyOfOption])

            );
              setShowItems(false);
              onChange(item[valueOfOption]);
            }}
          >
            {product ?   `${item.productSubCategory.productMainCategory.name} ${item.productSubCategory.name} ${item.thickness} میل - ${item.productCompany.name} - ${item.city.name}` :
            
            (keyOfOptionList?.length !== 0 ? keyOfOptionList?.filter(it => typeof it === 'object')?.map((itm, idx) => (findObjectValue(item, itm?.properties)  + (itm?.customText ? ' ' + itm.customText : '') + (idx == keyOfOptionList?.filter(it => typeof it === 'object')?.length - 1 ? '' : ' - '))) :  item[keyOfOption])
          }
          </p>
        ))
        }
      </div>
    </div>
  );
};

Select.defaultProps = {
  items: [
    // {
    //   id: 1,
    //   title: "سالام",
    // },
    // {
    //   id: 2,
    //
    //   title: "دوم",
    // },
    // {
    //   id: 2,
    //
    //   title: "دوم",
    // },
    // {
    //   id: 2,
    //
    //   title: "دوم",
    // },
    // {
    //   id: 2,
    //
    //   title: "دوم",
    // },
    // {
    //   id: 2,
    //
    //   title: "دوم",
    // },
    // {
    //   id: 2,
    //
    //   title: "دوم",
    // },
  ],
  keyOfOption: "title",
  valueOfOption: "_id",
  width: 'w-full',
  title: 'انتخاب کنید...'
};

export default Select;
