import React, { FC } from "react";

interface PageTitleProps {
     title: string;
     subTitle?: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title, subTitle }) => {
     return (
          <div className="py-5">
               <h6 className="text-2xl capitalize font-semibold">{title}</h6>
               {subTitle && <p className="text-gray-500">{subTitle}</p>}
          </div>
     );
};
