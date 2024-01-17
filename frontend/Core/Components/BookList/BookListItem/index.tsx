import React, { useState } from "react";
import { ProductListItem } from "../../../Redux/Reducers/reducerTypes";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "../../../Redux/store";
import { connect } from "react-redux";
import Stars from "../../Stars";

type BookListItemProps = {
  item: ProductListItem;
  isMobile: boolean;
};

const BookListItem = ({ item, isMobile }: BookListItemProps) => {
  const [showRating, setShowRating] = useState(false);
  return (
    <Link
      onMouseOver={() => setShowRating(true)}
      onMouseLeave={() => setShowRating(false)}
      href={`/book/${item.id}`}
      className="w-full bg-white p-3 flex flex-col justify-between overflow-hidden rounded-lg border hover:shadow-lg hover:-translate-y-3 hover:scale-110"
    >
      <div>
        <div className="w-full overflow-hidden flex justify-center h-52 relative">
          <Image
            src={item.coverUri}
            alt={item.title}
            width={'256'}
            height={'75'}
            className="rounded-lg object-contain drop-shadow"
            loading="lazy"
            priority={false}
          />

          {(!isMobile && showRating && item.rating) && (
            <div className="bg-black/50 backdrop-blur w-full h-full absolute rounded-lg flex flex-col items-center justify-center">
              <Stars value={Math.floor(item.rating)} />
              <p className="text-white text-sm mt-2">
                {Number(item?.rating?.toFixed(2)).toLocaleString("fa-ir")} از{" "}
                {item.rates
                  .map((item) => item.count)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString("fa-ir")}{" "}
                رای
              </p>
            </div>
          )}

          {item.sticker && (
            <Image
              src={item.sticker}
              alt={`استیکر ${item.title}`}
              width={100}
              height={100}
              className="absolute left-0"
            />
          )}
        </div>

        <p className="text-sm mt-3 mb-1 font-bold">{item.title}</p>
        <p className="text-xs text-gray-500">
          {item.authors.map(
            (author, idx) =>
              `${author.firstName} ${author.lastName} ${
                idx !== item.authors.length - 1 ? " - " : ""
              }`
          )}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="mt-2">{item.price.toLocaleString("fa-ir")} تومان</p>
        {(isMobile && item.rating) && (
          <div>
            <Stars value={Math.floor(item.rating)} />
          </div>
        )}
      </div>
    </Link>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
});

export default connect(mapStateToProps)(BookListItem);
