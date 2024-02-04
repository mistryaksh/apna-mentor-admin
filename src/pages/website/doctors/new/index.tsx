import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";

import {
     useLazyGetAllCategoryQuery,
     useCreateNewMentorMutation,
     useLazyGetAllSubCategoryQuery,
} from "../../../../app/api";
import { MentorValidationSchema } from "../../../../validation";
import { Layout } from "../../../../layout";
import { AppInput, AppButton } from "../../../../component/ui";

export const NewDoctorFormPage = () => {
     const [
          GetAllCategory,
          { isError: isCategoryError, error: categoryError, isLoading: isCategoryLoading, data: categoryData },
     ] = useLazyGetAllCategoryQuery();
     const [GetAllSubCategory, { isError, error, data }] = useLazyGetAllSubCategoryQuery();
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
          if (isError) {
               console.log(error);
          }
          if (isNewMentorSuccess) {
               toast.success(newMentorData?.data);
               navigate("/mentors/manage", { replace: true });
          }
          (async () => {
               await GetAllCategory();
               await GetAllSubCategory();
          })();
     }, [
          isCategoryError,
          categoryError,
          isCategoryLoading,
          categoryData?.data,
          isNewMentorError,
          newMentorError,
          newMentorData?.data,
          isNewMentorSuccess,
          navigate,
          GetAllCategory,
          GetAllSubCategory,
          isError,
          error,
     ]);

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

          await NewMentor({ ...(mentorDetails as any) });
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
                         initialValues={{
                              username: "",
                              password: "",
                              mobile: "",
                              email: "",
                              specialists: "",
                              subCategory: "none",
                              firstName: "",
                              lastName: "",
                              address: "",
                              category: "none",
                         }}
                         enableReinitialize
                         validationSchema={MentorValidationSchema}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
                              <form onSubmit={handleSubmit}>
                                   <div className="flex w-full items-center gap-5">
                                        <div className="flex-1">
                                             <AppInput
                                                  label="First name"
                                                  value={values.firstName}
                                                  onChange={handleChange("firstName")}
                                                  onBlur={handleBlur("firstName")}
                                                  touched={touched?.firstName}
                                                  error={errors?.firstName as string}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Last name"
                                                  value={values.lastName}
                                                  onChange={handleChange("lastName")}
                                                  onBlur={handleBlur("lastName")}
                                                  touched={touched.lastName as boolean}
                                                  error={errors.lastName as string}
                                             />
                                        </div>
                                   </div>
                                   <div className="flex gap-5 mt-5">
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Mobile number"
                                                  value={values.mobile}
                                                  onChange={handleChange("mobile")}
                                                  onBlur={handleBlur("mobile")}
                                                  touched={touched?.mobile as boolean}
                                                  error={errors?.mobile as string}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Email address"
                                                  value={values.email}
                                                  onChange={handleChange("email")}
                                                  onBlur={handleBlur("email")}
                                                  touched={touched.email as boolean}
                                                  error={errors.email as string}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Address"
                                                  value={values.address}
                                                  onChange={handleChange("address")}
                                                  onBlur={handleBlur("address")}
                                                  touched={touched?.address as boolean}
                                                  error={errors?.address as string}
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
                                                       <option value={category?._id} key={category?._id}>
                                                            {category.title}
                                                       </option>
                                                  ))}
                                             </select>
                                             {touched.category && (
                                                  <p className="text-right text-xs capitalize text-rose-500">
                                                       {errors.category}
                                                  </p>
                                             )}
                                        </div>
                                        <div className="flex-1">
                                             <label htmlFor="category" className="capitalize text-gray-500 text-sm">
                                                  Sub Category
                                             </label>
                                             <select
                                                  onChange={handleChange("subCategory")}
                                                  onBlur={handleBlur("subCategory")}
                                                  value={values.subCategory as any}
                                                  className="p-3 w-full border focus:border-teacher-500 rounded-md focus:outline-none"
                                             >
                                                  <option defaultValue={"none"} disabled selected>
                                                       Select category
                                                  </option>
                                                  {data?.data.map(({ categoryId, _id, label }) => (
                                                       <option value={_id} key={_id}>
                                                            {label} - {categoryId.title}
                                                       </option>
                                                  ))}
                                             </select>
                                             {touched.subCategory && (
                                                  <p className="text-right text-xs capitalize text-rose-500">
                                                       {errors.subCategory}
                                                  </p>
                                             )}
                                        </div>
                                   </div>
                                   <div className="mt-3 flex items-center gap-5">
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Spealists"
                                                  value={values.specialists}
                                                  onChange={handleChange("specialists")}
                                                  onBlur={handleBlur("specialists")}
                                                  touched={touched.specialists}
                                                  error={errors.specialists}
                                             />
                                        </div>
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Userame"
                                                  value={values.username}
                                                  onChange={handleChange("username")}
                                                  onBlur={handleBlur("username")}
                                                  touched={touched.username}
                                                  error={errors.username}
                                             />
                                        </div>
                                   </div>
                                   <div className="mt-3">
                                        <div className="flex-1">
                                             <AppInput
                                                  label="Password"
                                                  value={values.password}
                                                  onChange={handleChange("password")}
                                                  onBlur={handleBlur("password")}
                                                  touched={touched.password}
                                             />
                                             {touched.password && (
                                                  <p className="text-right text-xs capitalize text-rose-500">
                                                       {errors.password}
                                                  </p>
                                             )}
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
