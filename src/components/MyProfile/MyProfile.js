import React, { useState } from "react";
import MyOrders from "../MyOrders/MyOrders";
import AddBookBorrow from "./AddBookBorrow";
import AddBookExchange from "./AddBookExchange";
import AddedBooksBorrow from "./AddedBooksBorrow";
import AddedBooksExchange from "./AddedBooksExchange";
import "./MyProfile.css";

const MyProfile = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="mt-1">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Add A Book(for exchange)
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Add A Book(for Borrow)
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Added Books(for exchange)
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Added Books(for Borrow)
        </button>
        <button
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          My Orders
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <AddBookExchange></AddBookExchange>
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <AddBookBorrow></AddBookBorrow>
        </div>
        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <AddedBooksExchange></AddedBooksExchange>
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <AddedBooksBorrow></AddedBooksBorrow>
        </div>
        <div
          className={toggleState === 5 ? "content  active-content" : "content"}
        >
          <MyOrders></MyOrders>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
