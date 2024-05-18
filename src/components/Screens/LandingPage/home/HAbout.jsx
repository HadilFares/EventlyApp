import React from "react";
import Categories from "../allcourses/Categories";
import Heading from "../common/heading/Heading";
import "../allcourses/courses.css";
import { coursesCard } from "../../../../dummydata";

const HAbout = () => {
  return (
    <>
      <section className="homeAbout">
        <Categories />
      </section>
    </>
  );
};

export default HAbout;
