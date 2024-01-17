import React from "react";
import { RootState } from "../../../Redux/store";
import { connect } from "react-redux";
import { FooterTopProps } from "../FooterTop";
import Image from "next/image";
// assets
import logo from "../../../../public/assets/image/logo.png";

const FooterBottom = ({ isMobile }: FooterTopProps) => {
  let footerContent = `   طاقچه پلتفرمی است برای دسترسی قانونی به نسخهٔ دیجیتال و صوتی کتاب‌ها. طاقچه مانند پل ناشران و کتاب‌خوانان را به هم وصل‌ می‌کند.

    پس از آنکه ناشر برای کتاب یا مجله‌ٔ خود مجوز انتشار و شابک بگیرد، می‌تواند نسخهٔ الکترونیکی یا صوتی آن را از طریق طاقچه به مخاطبان خود برساند.
    
    پلتفرم طاقچه محصولی است از شرکت خدمات هوشمند ایدهٔ طلایی هاتف معاصر و شرکت نرم‌افزارهای هوشمند همراه هامون زرین.
    
    در طاقچه چه می‌کنیم؟
    در طاقچه با ناشران ارتباط می‌گیریم و ابزارهایی در اختیارشان می‌گذاریم که بتوانند محتوای خود را در اختیار مخاطبان بیشتری بگذارند، گزارش‌های متنوعی از عرضهٔ محتوای خود به‌دست بیاورند و… بنابراین به ناشر کمک می‌کنیم که کمتر دربارهٔ فروش و بازاریابی کتاب خود دغدغه داشته باشد و بیشتر بر تولید محتوای باکیفیت متمرکز شود.
    
    محتوایی که ناشران عرضه می‌کنند، نیازمند بهینه‌سازی‌های دیجیتالی است تا با کیفیت بهتری در اختیار مخاطب قرار بگیرد. این کار تماماً برعهدهٔ طاقچه است.
    
    پس از آنکه کتاب‌ها و نشریات به‌خوبی بر طاقچه قرار گرفتند، تلاش می‌کنیم آنها را به‌دست کاربران برسانیم. با همین هدف، همیشه پویش‌های مختلف و تخفیف‌های متنوعی در طاقچه عرضه می‌شود. در کنار آنها، تلاش می‌کنیم محتوایی که به دست مخاطب می‌رسد، خوب و آسان خوانده شود. بنابراین بر کنش مطالعه و بهبود تجربۀ خواندن و شنیدن، تمرکز کرده‌ایم.
    
    `;
  return (
    <div
      className={`w-full max-w-[65rem] flex ${
        isMobile ? "flex-col" : ""
      } gap-4 items-center`}
    >
      <div className={`${isMobile ? "w-60" : "w-24"}`}>
        <Image
          src={logo}
          alt="logo"
          className={`${isMobile ? "" : "rotate-90"}`}
        />
      </div>
      <div className="flex-1 text-justify ">{footerContent}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
});

export default connect(mapStateToProps)(FooterBottom);
