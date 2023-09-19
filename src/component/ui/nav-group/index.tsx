import React, { FC } from "react";
import { NavLink, NavLinkProps } from "../nav-link";

export interface NavGroupProps {
     label: string;
     nav: NavLinkProps[];
}

export const NavGroup: FC<NavGroupProps> = ({ label, nav }) => {
     return (
          <div className="flex flex-col">
               <label htmlFor="general" className="uppercase text-[0.65rem] text-gray-400 font-semibold">
                    {label}
               </label>
               <div className="mb-3 mt-2 flex flex-col gap-5">
                    {nav.map((elements, i) => (
                         <NavLink key={i} {...elements} />
                    ))}
               </div>
          </div>
     );
};
