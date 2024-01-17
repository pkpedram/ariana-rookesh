import React, { RefObject, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { FiShare2 } from "react-icons/fi";
import Image from "next/image";

type ShareButtonProps = {
  bookInfoRef: RefObject<HTMLDivElement>;
  shareStart: boolean;
  setShareStart: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const ShareButton = ({
  bookInfoRef,
  setShareStart,
  title,
  shareStart,
}: ShareButtonProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const shareHandler = async () => {
    setShareStart(true);
  };

  useEffect(() => {
    if (shareStart) {
      // Turning html to canvas
      html2canvas(
        bookInfoRef.current
          ? bookInfoRef.current
          : document.getElementsByTagName("body")[0]
      ).then((item) => {
        let image = item.toDataURL("image/png", 1.0);
        // setting base64 image as file

        fetch(image)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], title, { type: "image/png" });

            // check that the browser can support share option

            if (!navigator.canShare) {
              setImageSrc(image);
              setModalOpened(true);
            } else {
              navigator.share({
                files: [file],
                title: "در طاقچه بخوانید",
              });
            }
          });

        setShareStart(false);
      });
    }
  }, [shareStart]);
  return (
    <>
      <button
        className={`text-xl w-full md:bg-main-blue rounded-full flex justify-center p-3 ${
          shareStart && "hidden"
        }`}
        onClick={shareHandler}
      >
        <FiShare2 />
      </button>
      {modalOpened && (
        <div className="fixed w-full min-h-screen flex items-center justify-center bg-black/20 backdrop-blur top-0 right-0 z-40">
          <div
            className="fixed w-full h-full bg-black/20 backdrop-blur top-0 right-0 z-40"
            onClick={() => setModalOpened(false)}
          ></div>
          <div className="md:w-4/5 rounded-xl shadow-xl flex flex-col items-center p-6 bg-white z-50 relative">
            <h1 className="text-lg font-bold text-main-blue">
              انتشار این کتاب با دوستان!
            </h1>
            <div className="md:h-40 md:w-auto w-72 my-3 drop-shadow-sm">
              <Image
                src={imageSrc}
                alt={title}
                width={500}
                height={500}
                className=" h-full rounded-md object-contain"
              />
            </div>
            <p className="md:w-full w-72 text-xs text-red-500">
              کاربر گرامی مرورگر شما اجازه انتشار نمیدهد. لطفا از طریق لینک زیر
              عکس را دانلود کرده وبرای دوستانتان بفرستید
            </p>
            <a
              className=" py-2 px-6 rounded-lg bg-main-blue text-white mt-3"
              href={imageSrc}
              download={title}
            >
              دانلود عکس اطلاعات کتاب
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
