import React from "react";
import noResult from "../../assets/images/logo/noResult.png";

const NoResultFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div>
        <img src={noResult} alt="" />
      </div>
    </div>
  );
};

export default NoResultFound;
