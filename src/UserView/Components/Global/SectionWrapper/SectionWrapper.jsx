/* import packages */
import React from "react";
import clsx from "clsx";

export default function SectionWrapper({
  title,
  subTitle,
  content,
  customClass,
  titleCustomClass,
  contentCustomClass,
}) {
  return (
    <section className={clsx("py-10", customClass)}>
      <div className="container mx-auto px-3">
        {title && (
          <div className={clsx("section-title", "py-4 px-4 mb-20")}>
            <h3
              className={clsx(
                "title",
                "uppercase text-[#fffffffc] text-4xl font-extrabold tracking-wide relative",
                "before:absolute before:block before:w-5 before:h-[60px] before:-top-2 before:-left-2 before:bg-[#F3842A] before:-z-[1]",
                "mb-2",
                titleCustomClass
              )}
            >
              <span className="relative z-[2]">{title}</span>
            </h3>
            {subTitle && (
              <h6
                className={clsx(
                  "sub-title text-base tracking-wider text-slate-300 font-medium",
                  "pl-4"
                )}
              >
                {subTitle}
              </h6>
            )}
          </div>
        )}
        {content && (
          <div className={clsx("section-content", contentCustomClass)}>
            {content}
          </div>
        )}
      </div>
    </section>
  );
}
