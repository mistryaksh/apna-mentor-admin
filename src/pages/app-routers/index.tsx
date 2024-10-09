import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedPages } from "../../component";
import { DashboardPage } from "../dashboard";
import { LoginPage } from "../accounts";
import {
  DoctorsPage,
  ManageBlogPage,
  NewBlogPage,
  NewDoctorFormPage,
  SpecificBlogPage,
  TopDoctorPage,
  UsersPage,
  ManageCategoryPage,
  VideoCallsPage,
  MentorDetailsPage,
  UserDetailsPage,
} from "../website";
import { PaymentPage } from "../payment";

export const AppRouters = () => {
  return (
    <Routes>
      <Route element={<ProtectedPages />}>
        <Route element={<DashboardPage />} path="/dashboard" />
        <Route element={<VideoCallsPage />} path="/call-logs" />
        <Route element={<PaymentPage />} path="/payment" />
        <Route path="mentors">
          <Route element={<DoctorsPage />} path="manage" />
          <Route element={<MentorDetailsPage />} path=":mentorId" />
          <Route element={<NewDoctorFormPage />} path="new" />
          <Route element={<TopDoctorPage />} path="top-lists" />
          <Route element={<ManageCategoryPage />} path="categories" />
        </Route>
        <Route path="users">
          <Route element={<UsersPage />} path="manage" />
          <Route element={<UserDetailsPage />} path=":userId" />
        </Route>
        <Route path="blogs">
          <Route element={<ManageBlogPage />} path="manage" />
          <Route element={<NewBlogPage />} path="new" />
          <Route element={<SpecificBlogPage />} path="manage/:id" />
        </Route>
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<div>Not found 404</div>} />
    </Routes>
  );
};
