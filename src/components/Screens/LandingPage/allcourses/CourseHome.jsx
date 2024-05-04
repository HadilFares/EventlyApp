import React from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import Categories from "./Categories";

const CourseHome = () => {
  return (
    <>
      <Back title="Explore Courses" />
      <Categories />
    </>
  );
};

export default CourseHome;
