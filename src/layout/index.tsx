import React, { FC, ReactNode, useCallback, useEffect } from "react";

import Helmet from "react-helmet";
import {
     AiOutlineApi,
     AiOutlineArrowUp,
     AiOutlineBell,
     AiOutlineBook,
     AiOutlineDashboard,
     AiOutlineDotChart,
     AiOutlineIssuesClose,
     AiOutlineMenu,
     AiOutlineMore,
     AiOutlineTeam,
     AiOutlineUser,
     AiOutlineUserSwitch,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { AppButton, NavGroup } from "../component";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { useLogoutAdminMutation } from "../app/async-action";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { AppLogOut, handleNavbar, handleSideNav, useLayoutSlice } from "../features";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const Layout: FC<ILayoutProps> = ({ pageTitle, children }) => {
     const [Logout, { isError, isSuccess, error, isLoading }] = useLogoutAdminMutation();
     const { navBar, sideNav } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (isError) {
               toast.error((error as any).data.message);
          }
          if (isSuccess) {
               toast.success("Logging Out");
               dispatch(AppLogOut());
               navigate("/dashboard", { replace: true });
          }
     }, [isError, error, isSuccess, dispatch, navigate]);

     const LogoutUser = useCallback(async () => {
          await Logout(localStorage.getItem("admin_token"));
     }, [Logout]);

     return (
          <div className="h-screen flex overflow-hidden transition-all duration-300">
               {sideNav && (
                    <div
                         className={clsx(
                              "duration-300 w-[260px] p-3 flex flex-col justify-between border-r overflow-y-scroll"
                         )}
                    >
                         <div>
                              <h6 className="font-poppins text-2xl">Apna Mentor</h6>
                              <div className="mt-5">
                                   <NavGroup
                                        label="General"
                                        nav={[
                                             { Icon: AiOutlineDashboard, label: "dashboard", path: "/dashboard" },
                                             { Icon: AiOutlineDotChart, label: "analysis", path: "/analysis" },
                                             { Icon: AiOutlineApi, label: "api keys", path: "/api-keys" },
                                        ]}
                                   />
                                   <NavGroup
                                        label="website managements"
                                        nav={[
                                             { Icon: AiOutlineUser, label: "users", path: "/users/manage" },
                                             { Icon: AiOutlineTeam, label: "doctors", path: "/doctors/manage" },
                                             { Icon: AiOutlineBook, label: "blogs", path: "/blogs/manage" },
                                             { Icon: LiaStethoscopeSolid, label: "consultancy", path: "/consultancy" },
                                        ]}
                                   />
                                   <NavGroup
                                        label="support system"
                                        nav={[
                                             { Icon: AiOutlineIssuesClose, label: "issues", path: "/users" },
                                             { Icon: MdPayment, label: "payments", path: "/payment" },
                                             { Icon: AiOutlineUserSwitch, label: "accounts", path: "/accounts" },
                                             { Icon: AiOutlineMore, label: "other", path: "/other" },
                                        ]}
                                   />
                                   <NavGroup
                                        label="settings"
                                        nav={[
                                             {
                                                  Icon: AiOutlineIssuesClose,
                                                  label: "payment gateway",
                                                  path: "/payment/gateway",
                                             },
                                             { Icon: MdPayment, label: "payments", path: "/payment" },
                                        ]}
                                   />
                              </div>
                         </div>
                         <div className="py-5">
                              <AppButton onClick={LogoutUser} loading={isLoading} type="button" fullWidth danger>
                                   Logout
                              </AppButton>
                         </div>
                    </div>
               )}
               <main className=" overflow-y-scroll relative flex-1">
                    <Helmet>
                         <title>{pageTitle} | admin | Apna Mentor</title>
                    </Helmet>
                    <section>
                         {navBar && (
                              <nav className="absolute py-4 px-5 top-0 backdrop-blur-lg w-full">
                                   <div className="flex items-center justify-between">
                                        <button onClick={() => dispatch(handleSideNav())}>
                                             <AiOutlineMenu size={24} />
                                        </button>
                                        <h6 className="text-lg font-roboto">{pageTitle} | Administrator</h6>
                                        <div className=" flex gap-5">
                                             <button>
                                                  <AiOutlineBell size={24} className="fill-gray-500" />
                                             </button>
                                             <button>
                                                  <FiUser size={24} className="stroke-gray-500" />
                                             </button>

                                             <button onClick={() => dispatch(handleNavbar())}>
                                                  <AiOutlineArrowUp size={24} className="stroke-gray-500" />
                                             </button>
                                        </div>
                                   </div>
                              </nav>
                         )}
                         <section className="mt-14 px-10">{children}</section>
                    </section>
               </main>
          </div>
     );
};

export interface ILayoutProps {
     pageTitle: string;
     children: ReactNode;
}
