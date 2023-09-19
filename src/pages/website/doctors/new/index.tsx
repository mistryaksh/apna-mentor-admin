import React, { useEffect } from "react";
import { Formik } from "formik";
import { AppButton, AppInput } from "../../../../component";
import { Layout } from "../../../../layout";
import { NewDoctorInitial, NewDoctorValidation } from "../../../../validation";
import { IoArrowBack } from "react-icons/io5";
import { IDoctorProps } from "../../../../interface";
import { useCreateDoctorProfileMutation } from "../../../../app/async-action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleInput, handleSpecialization, removeSpecialization, useDoctorSlice } from "../../../../features";
import { useAppDispatch } from "../../../../app/hooks";
import { AiOutlineClose } from "react-icons/ai";

export const NewDoctorFormPage = () => {
     const [UploadDoctor, { isError, isSuccess, error, isLoading }] = useCreateDoctorProfileMutation();
     const { specialization, input } = useDoctorSlice();
     const navigate = useNavigate();
     const dispatch = useAppDispatch();

     const UploadRequest = async (e: any) => {
          const details: IDoctorProps = {
               authDetails: {
                    password: e.password,
                    username: e.username,
               },
               contact: {
                    address: e.address,
                    email: e.email,
                    mobile: e.mobile,
               },
               name: {
                    firstName: e.firstName,
                    gender: e.gender,
                    lastName: e.lastName,
               },
               workDetails: {
                    hospital: {
                         address: e.hospitalAddress,
                         name: e.hospitalName,
                         specialization: specialization,
                    },
               },
          };
          return await UploadDoctor({
               authDetails: details.authDetails,
               contact: details.contact,
               name: details.name,
               workDetails: details.workDetails,
          });
     };

     useEffect(() => {
          if (isError) {
               toast.error((error as any).data.message);
          }
          if (isSuccess) {
               toast.success("Details updated");
               navigate("/doctors/manage", { replace: true });
          }
     }, [isError, error, isSuccess, navigate]);

     return (
          <Layout pageTitle="Upload new doctor">
               <div className="py-10">
                    <div className="">
                         <button
                              onClick={() => navigate("/doctors/manage", { replace: true })}
                              type="submit"
                              className="flex gap-3"
                         >
                              <IoArrowBack size={26} />
                              <p className="capitalize text-lg">back</p>
                         </button>
                    </div>
               </div>
               <div className="pb-10">
                    <Formik
                         initialValues={NewDoctorInitial}
                         validationSchema={NewDoctorValidation}
                         onSubmit={UploadRequest}
                         enableReinitialize
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm }) => (
                              <form onSubmit={handleSubmit}>
                                   <label className="uppercase text-sm" htmlFor="personal">
                                        Personal
                                   </label>
                                   <div id="personal" className="flex mt-5 items-center gap-3">
                                        <div className="flex-1">
                                             <AppInput
                                                  error={errors?.firstName as string}
                                                  label="Doctor name"
                                                  touched={touched?.firstName as boolean}
                                                  value={values.firstName}
                                                  onChange={handleChange("firstName")}
                                                  onBlur={handleBlur("firstName")}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  error={errors?.lastName as string}
                                                  label="Surname"
                                                  touched={touched?.lastName as boolean}
                                                  value={values.lastName}
                                                  onChange={handleChange("lastName")}
                                                  onBlur={handleBlur("lastName")}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex gap-5 my-5">
                                        <div className="flex items-center">
                                             <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                  <input
                                                       aria-labelledby="label2"
                                                       type="radio"
                                                       name="radio"
                                                       className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none checked:bg-blue-500"
                                                  />
                                                  <div className="check-icon hidden border-4 border-blue-700 rounded-full w-full h-full z-1"></div>
                                             </div>
                                             <label
                                                  id="label2"
                                                  className="ml-2 text-md leading-4 font-normal text-gray-800"
                                             >
                                                  Male
                                             </label>
                                        </div>
                                        <div className="flex items-center my-3">
                                             <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                  <input
                                                       aria-labelledby="label2"
                                                       type="radio"
                                                       name="radio"
                                                       className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none checked:bg-blue-500"
                                                  />
                                                  <div className="check-icon hidden border-4 border-blue-700 rounded-full w-full h-full z-1"></div>
                                             </div>
                                             <label
                                                  id="label2"
                                                  className="ml-2 text-md leading-4 font-normal text-gray-800"
                                             >
                                                  Female
                                             </label>
                                        </div>
                                        <div className="flex items-center my-3">
                                             <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                                  <input
                                                       aria-labelledby="label2"
                                                       type="radio"
                                                       name="radio"
                                                       className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none checked:bg-blue-500"
                                                  />
                                                  <div className="check-icon hidden border-4 border-blue-700 rounded-full w-full h-full z-1"></div>
                                             </div>
                                             <label
                                                  id="label2"
                                                  className="ml-2 text-md leading-4 font-normal text-gray-800"
                                             >
                                                  Prefer not to say
                                             </label>
                                        </div>
                                   </div>
                                   <label className="uppercase text-sm" htmlFor="contact">
                                        Contact
                                   </label>
                                   <div id="contact" className="flex items-center flex-wrap gap-3">
                                        <div className="flex-1">
                                             <AppInput
                                                  error={errors?.email as string}
                                                  label="Email address"
                                                  touched={touched?.email as boolean}
                                                  value={values.email}
                                                  onChange={handleChange("email")}
                                                  onBlur={handleBlur("email")}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  maxLength={10}
                                                  minLength={10}
                                                  error={errors?.mobile as string}
                                                  label="Mobile number"
                                                  touched={touched?.mobile as boolean}
                                                  value={values.mobile}
                                                  onChange={handleChange("mobile")}
                                                  onBlur={handleBlur("mobile")}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  error={errors?.address as string}
                                                  label="Home address"
                                                  touched={touched?.address as boolean}
                                                  value={values.address}
                                                  onChange={handleChange("address")}
                                                  onBlur={handleBlur("address")}
                                             />
                                        </div>
                                   </div>
                                   <div className="mt-5">
                                        <label className="uppercase text-sm" htmlFor="work">
                                             Work details
                                        </label>
                                        <div id="work" className="flex items-center gap-3 mt-3">
                                             <div className="flex-1">
                                                  <AppInput
                                                       error={errors?.hospitalName as string}
                                                       label="Hospital name"
                                                       touched={touched?.hospitalName as boolean}
                                                       value={values.hospitalName}
                                                       onChange={handleChange("hospitalName")}
                                                       onBlur={handleBlur("hospitalName")}
                                                  />
                                             </div>
                                             <div className="flex-1">
                                                  <AppInput
                                                       error={errors?.hospitalAddress as string}
                                                       label="Hospital address"
                                                       touched={touched?.hospitalAddress as boolean}
                                                       value={values.hospitalAddress}
                                                       onChange={handleChange("hospitalAddress")}
                                                       onBlur={handleBlur("hospitalAddress")}
                                                  />
                                             </div>
                                        </div>
                                        <div className="flex gap-3 rounded-md pt-5 flex-wrap">
                                             {specialization.length !== 0 &&
                                                  specialization.map((x, i) => (
                                                       <div className="bg-primary-100 px-5 py-2 flex items-center gap-3 rounded-lg">
                                                            {x}{" "}
                                                            <button onClick={() => dispatch(removeSpecialization(i))}>
                                                                 <AiOutlineClose />
                                                            </button>
                                                       </div>
                                                  ))}
                                        </div>
                                        <div id="work" className="flex items-center gap-3 mt-3">
                                             <div className="flex gap-3 w-full items-center justify-center">
                                                  <div className="flex-1">
                                                       <AppInput
                                                            label="Type specialization"
                                                            value={input?.toString()}
                                                            onChange={(e) => {
                                                                 dispatch(handleInput(e.target.value));
                                                            }}
                                                       />
                                                  </div>
                                                  <div className="mt-5">
                                                       <AppButton
                                                            type="button"
                                                            onClick={() => dispatch(handleSpecialization(input))}
                                                            primary
                                                       >
                                                            Add
                                                       </AppButton>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="mt-5">
                                        <label className="uppercase text-sm" htmlFor="work">
                                             Account information - this details will help doctor to login
                                        </label>
                                        <div id="work" className="flex items-center gap-3 mt-2">
                                             <div className="flex-1">
                                                  <AppInput
                                                       error={errors?.username as string}
                                                       label="Create username"
                                                       touched={touched?.username as boolean}
                                                       value={values.username}
                                                       onChange={handleChange("username")}
                                                       onBlur={handleBlur("username")}
                                                  />
                                             </div>
                                        </div>
                                        <div id="work" className="flex items-center gap-3 mt-2">
                                             <div className="flex-1">
                                                  <AppInput
                                                       error={errors?.password as string}
                                                       label="Create Password"
                                                       touched={touched?.password as boolean}
                                                       value={values.password}
                                                       onChange={handleChange("password")}
                                                       onBlur={handleBlur("password")}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="mt-5 flex justify-end gap-3">
                                        {/* <AppButton danger type="button" onClick={() => resetForm()}>
                                                  Clear
                                             </AppButton> */}
                                        <AppButton loading={isLoading} type="submit" primary>
                                             Submit
                                        </AppButton>
                                   </div>
                              </form>
                         )}
                    </Formik>
               </div>
          </Layout>
     );
};
