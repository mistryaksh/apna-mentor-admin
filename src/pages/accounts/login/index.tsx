import React, { useEffect } from "react";
import { useLoginAdminMutation } from "../../../app/async-action/auth-api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AppLogin } from "../../../features";
import { Formik } from "formik";
import { ISignInProps } from "../../../interface";
import { SignInSchema, SignInValidationValue } from "../../../validation";
import { AppButton, AppInput } from "../../../component";
import { GetTokenFromLocal } from "../../../utils";

export const LoginPage = () => {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const token = GetTokenFromLocal();

     const [loginUser, { data: loginData, isError, isLoading, isSuccess, error }] = useLoginAdminMutation();

     const handleLogin = async ({ mobile, password }: ISignInProps) => {
          await loginUser({ mobile, password });
     };

     useEffect(() => {
          if (isSuccess) {
               dispatch(AppLogin(loginData.data.token));
               toast.success(loginData.data.message);
               navigate("/dashboard", { replace: true });
          }
          if (token) {
               navigate("/dashboard", { replace: true });
          }
     }, [isSuccess, dispatch, loginData, navigate, token, isError, error]);

     return (
          <div className="flex h-screen">
               <div className="w-[400px] flex flex-col px-5 py-3 justify-between">
                    <h6 className="text-4xl text-primary-500 mt-10">Login to your account</h6>
                    <div className="flex gap-1 font-bold py-5">
                         Don't have an account?
                         <Link to="/register" className="text-blue-500">
                              Sign up
                         </Link>
                    </div>
                    <hr className="my-5" />
                    <Formik
                         onSubmit={handleLogin}
                         initialValues={SignInValidationValue}
                         validationSchema={SignInSchema}
                    >
                         {({ handleBlur, handleChange, handleSubmit, touched, errors, values }) => (
                              <form onSubmit={handleSubmit} className="h-full">
                                   <div className="flex flex-col gap-5 justify-between h-full items-stretch">
                                        <div className="flex gap-3 flex-col">
                                             {/* {isError && (
                                                  <p className="text-rose-500 capitalize">
                                                       {(error as any).data.message}
                                                  </p>
                                             )} */}
                                             <AppInput
                                                  maxLength={10}
                                                  minLength={10}
                                                  type="number"
                                                  label="Mobile number"
                                                  value={values.mobile}
                                                  error={errors.mobile as string}
                                                  touched={touched.mobile as boolean}
                                                  onChange={handleChange("mobile")}
                                                  onBlur={handleBlur("mobile")}
                                             />
                                             <AppInput
                                                  label="Password"
                                                  type="password"
                                                  value={values.password}
                                                  error={errors.password as string}
                                                  touched={touched.password as boolean}
                                                  onChange={handleChange("password")}
                                                  onBlur={handleBlur("password")}
                                             />
                                        </div>
                                        <div>
                                             <div className="flex justify-end">
                                                  <AppButton type="submit" primary loading={isLoading}>
                                                       Login
                                                  </AppButton>
                                             </div>
                                             <hr className="my-5" />
                                             <p className="text-sm text-gray-500 font-semibold pb-3">
                                                  Not remember password?{" "}
                                                  <Link to="/reset-password" className="text-blue-500 font-normal">
                                                       Developer Contact
                                                  </Link>
                                             </p>
                                        </div>
                                   </div>
                              </form>
                         )}
                    </Formik>
               </div>
               <div className="flex-1  p-3 bg-gradient-to-tr from-brandPrimary-100 to-brandSecondary-100 flex flex-col justify-center items-center">
                    <div className="flex items-center justify-center">
                         <img
                              src={require("../../../assets/image/apna-mentor.jpeg")}
                              alt="website_logo"
                              className="w-[80%] rounded-lg"
                         />
                    </div>
                    <h6 className="text-3xl font-poppins text-center py-3">
                         <span className="text-brandPrimary-500 font-semibold">Apna</span>{" "}
                         <span className="text-brandSecondary-500 font-semibold">Mentor</span>
                         <span>Administration Service</span>
                    </h6>
               </div>
          </div>
     );
};
