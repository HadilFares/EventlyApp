import React from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero-bg"></div>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Heading
              subtitle="WELCOME TO Evently.TN"
              title="Best Online Event Management"
            />
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
            <div className="button">
              <Link to="/register">
                <button className="primary-btn cursor-pointer">
                  register <i className="fa fa-long-arrow-alt-right"></i>
                </button>
              </Link>
              <Link to="/login">
                <button className="primary-btn cursor-pointer">
                  Login <i className="fa fa-long-arrow-alt-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
