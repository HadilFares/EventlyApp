import React, { useEffect, useRef, useState } from "react";
import "./courses.css";
import "./scrollcourses.css";
import axios from "axios";
import Heading from "../common/heading/Heading";
import ScrollButtons from "./ScrollButtons";
import { variables } from "../../../../variables";
const Categories = () => {
  const scrollableRef = useRef(null);
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const checkScroll = () => {
    if (
      scrollableRef &&
      scrollableRef.current &&
      scrollableRef.current.scrollWidth > scrollableRef.current.clientWidth
    ) {
      setIsScrollVisible(true);
    } else {
      setIsScrollVisible(false);
    }
  };

  const onScroll = (offset) => {
    if (scrollableRef) {
      scrollableRef.current.scrollLeft += offset;
    }
  };

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const GetCategories = async () => {
    try {
      const result = await axios.get(
        variables.API_URL + "Category/GetAllNamesCategories",
        config
      );
      setCategories(result.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkScroll();
    GetCategories();
  }, []);
  return (
    <>
      <section className="online">
        <div className="container">
          <Heading subtitle="Categories" title="Our  Categories" />
          <div className="contentscroll grid3 d-flex">
            {categories.map((val) => (
              <div className="boxscroll">
                <h1>{val}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
