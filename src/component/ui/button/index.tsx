import clsx from "clsx";
import React, { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface AppButtonProps {
     loading?: boolean;
     fullWidth?: boolean;
     primary?: boolean;
     danger?: boolean;
}

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & AppButtonProps;

export const AppButton: FC<Props> = ({ loading, primary, fullWidth, danger, children, ...rest }) => {
     return (
          <button
               disabled={loading}
               {...rest}
               className={clsx(
                    `px-12 py-2 rounded-lg disabled:bg-gray-400`,
                    primary && "bg-primary-500",
                    fullWidth && "w-full flex justify-center",
                    danger && "bg-red-500"
               )}
          >
               {loading ? (
                    <AiOutlineLoading3Quarters size={24} className="text-white animate-spin" />
               ) : (
                    <span className="text-white text-md">{children}</span>
               )}
          </button>
     );
};
