import React from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Hprice from "./Hprice";
import Testimonal from "./testimonal/Testimonal";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Search from "../Search/Search";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutCard />
      <HAbout />
      <Search />
      <Hblog />
      <Testimonal />
      <Footer />
    </>
  );
};

export default Home;
