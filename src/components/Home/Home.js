import React from "react";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import Events from "../Events/Events";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
// import SliderFeature from "../SliderFeature/SliderFeature";
import Trust from "../Trust/Trust";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <Events></Events>
      <Trust></Trust>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
