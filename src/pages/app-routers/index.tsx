import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedPages } from "../../component";
import { DashboardPage } from "../dashboard";
import { LoginPage } from "../accounts";
import { DoctorsPage, ManageBlogPage, NewDoctorFormPage, SpecificBlogPage, TopDoctorPage, UsersPage } from "../website";

export const AppRouters = () => {
     return (
          <Routes>
               <Route element={<ProtectedPages />}>
                    <Route element={<DashboardPage />} path="/dashboard" />
                    <Route path="doctors">
                         <Route element={<DoctorsPage />} path="manage" />
                         <Route element={<NewDoctorFormPage />} path="new" />
                         <Route element={<TopDoctorPage />} path="top-lists" />
                    </Route>
                    <Route path="users">
                         <Route element={<UsersPage />} path="manage" />
                    </Route>
                    <Route path="blogs">
                         <Route element={<ManageBlogPage />} path="manage" />
                         <Route element={<SpecificBlogPage />} path="manage/:id" />
                    </Route>
               </Route>
               <Route path="/" element={<LoginPage />} />
               <Route path="*" element={<div>Not found 404</div>} />
          </Routes>
     );
};
