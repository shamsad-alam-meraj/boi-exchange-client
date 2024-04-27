import React from "react";
import bannerTwo from "../../assets/images/banner/banner02.png";

const Events = () => {
  return (
    <div className="px-5">
      <h1 className="text-center font-serif font-bold text-green-600 text-3xl py-5 my-5">
        Upcoming Events
      </h1>
      <div class="hero min-h-screen bg-cyan-50">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img
            src={bannerTwo}
            class="max-w-sm rounded-lg shadow-2xl lg:ml-5"
            alt=""
          />
          <div>
            <h1 class="lg:text-5xl text-2xl font-bold font-serif">
              Book Exchange Fair
            </h1>
            <p class="pt-6 font-serif">
              At DIU, Ashulia, Savar, Dhaka. <br />
              You can Join and Exchange your Book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
