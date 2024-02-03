import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";

import {
     useLazyGetAllCategoryQuery,
     useCreateNewMentorMutation,
} from "../../../../app/api";
import { initialMentorValues, MentorValidationSchema } from "../../../../validation";
import { Layout } from "../../../../layout";
import { AppInput, AppButton } from "../../../../component/ui";

export const NewDoctorFormPage = () => {
     const [GetAllCategory, {
          isError: isCategoryError,
          error: categoryError,
          isLoading: isCategoryLoading,
          data: categoryData,
     }] = useLazyGetAllCategoryQuery();
     const [
          NewMentor,
          { isError: isNewMentorError, error: newMentorError, data: newMentorData, isSuccess: isNewMentorSuccess },
     ] = useCreateNewMentorMutation();

     const navigate = useNavigate();

     useEffect(() => {
          if (isCategoryError) {
               console.log(categoryError);
          }
          if (isNewMentorError) {
               console.log(newMentorError);
          }
          if (isNewMentorSuccess) {
               toast.success(newMentorData?.data);
               navigate("/mentors/manage", { replace: true });
          }
          (async () => {
               await GetAllCategory();
          })();
     }, [isCategoryError, categoryError, isCategoryLoading, categoryData?.data, isNewMentorError, newMentorError, newMentorData?.data, isNewMentorSuccess, navigate, GetAllCategory]); 

     const handleSubmit = async (e: any) => {
          console.log("🚀 ~ handleSubmit ~ e:", e);
          const mentorDetails = {
               auth: {
                    username: e.username,
                    password: e.password,
               },
               contact: {
                    address: e.address,
                    email: e.email,
                    mobile: e.mobile,
               },
               name: {
                    firstName: e.firstName,
                    lastName: e.lastName,
               },
               category: e.category as any,
               specialists: [],
               subCategory: e.subCategory as any,
          };

          
          await NewMentor({ ...mentorDetails as any });
     };
     return (
          <Layout pageTitle="New Mentor">
               <div className="mb-6">
                    <h6 className="text-3xl font-semibold capitalize">Creating New Mentor</h6>
                    <p className="text-gray-500">
                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, atque veritatis adipisci
                         eligendi nesciunt officia!
                    </p>
               </div>
               {!isCategoryLoading && (
                    <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialMentorValues}
                    enableReinitialize
                    validationSchema={MentorValidationSchema}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
                              <form onSubmit={handleSubmit}>
                                   <div className="flex w-full items-center gap-5">
                                        <div className="flex-1">
                                             <AppInput
                                                  label="First name"
                                                  value={values.name.firstName}
                                                  onChange={handleChange("name.firstName")}
                                                  onBlur={handleBlur("name.firstName")}
                                                  touched={touched?.name?.firstName as boolean}
                                                  error={errors?.name?.firstName as string}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Last name"
                                                  value={values.name.lastName}
                                                  onChange={handleChange("name.lastName")}
                                                  onBlur={handleBlur("name.lastName")}
                                                  touched={touched?.name?.lastName as boolean}
                                                  error={errors?.name?.lastName as string}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex gap-5 mt-5">
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Mobile number"
                                                  value={values.contact.mobile}
                                                  onChange={handleChange("contact.mobile")}
                                                  onBlur={handleBlur("contact.mobile")}
                                                  touched={touched?.contact?.mobile as boolean}
                                                  error={errors?.contact?.mobile as string}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Email address"
                                                  value={values.contact.email}
                                                  onChange={handleChange("contact.email")}
                                                  onBlur={handleBlur("contact.email")}
                                                  touched={touched?.contact?.email as boolean}
                                                  error={errors?.contact?.email as string}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Address"
                                                  value={values.contact.address}
                                                  onChange={handleChange("contact.address")}
                                                  onBlur={handleBlur("contact.address")}
                                                  touched={touched?.contact?.address as boolean}
                                                  error={errors?.contact?.address as string}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex gap-5 mt-5">
                                        <div className="flex-1">
                                             <label htmlFor="category" className="capitalize text-gray-500 text-sm">
                                                  Category
                                             </label>
                                             <select
                                                  onChange={handleChange("category")}
                                                  onBlur={handleBlur("category")}
                                                  value={values.category as any}
                                                  className="p-3 w-full border focus:border-teacher-500 rounded-md focus:outline-none"
                                             >
                                                  <option defaultValue={"none"} disabled selected>
                                                       Select category
                                                  </option>
                                                  {categoryData?.data.map((category) => (
                                                  <option
                                                       defaultValue={category?._id}
                                                       value={category?._id}
                                                       key={category?._id}
                                                  >
                                                       {category.title}
                                                  </option>
                                                  ))}
                                             </select>
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Userame"
                                                  value={values.auth.username}
                                                  onChange={handleChange("auth.username")}
                                                  onBlur={handleBlur("auth.username")}
                                                  touched={touched?.auth?.username}
                                                  error={errors?.auth?.username}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Password"
                                                  value={values.auth.password}
                                                  onChange={handleChange("auth.password")}
                                                  onBlur={handleBlur("auth.password")}
                                                  touched={touched?.auth?.password}
                                                  error={errors?.auth?.password}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex justify-end mt-5">
                                        <AppButton primary type="submit">
                                             Save details
                                        </AppButton>
                                   </div>
                              </form>
                         )}
                    </Formik>
               )}
          </Layout>
     );
};
