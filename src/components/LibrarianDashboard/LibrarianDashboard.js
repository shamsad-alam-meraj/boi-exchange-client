import React from "react";
import { Link } from "react-router-dom";
import useBooks from "../../hooks/useBooks";
import manage from "../../assets/images/logo/bookManage.png";
import orderManage from "../../assets/images/logo/orderManage.png";
import useOrders from "../../hooks/useOrders";

const LibrarianDashboard = () => {
  const [books] = useBooks();
  const [orders] = useOrders();

  return (
    <div className="bg-gray-400 h-screen pt-10">
      <div className="flex justify-center items-center mb-5">
        <h1 className="text-2xl font-bold font-serif text-white border-b-2 border-orange-400">
          Librarian Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full px-10">
        <div className="h-40 flex justify-evenly items-center bg-red-400 rounded-xl shadow-inner shadow-blue-400">
          <div>
            <h5 className="font-bold font-serif text-2xl text-white mb-0 pb-0">
              {books.length}
            </h5>
            <h2 className="font-bold font-serif text-lg text-white mt-0 pt-0">
              Books
            </h2>
          </div>
          <Link to="books" className="flex  btn btn-ghost btn-sm">
            <h3 className="font-semibold font-serif text-white normal-case">
              Details
            </h3>
            <img className="w-5 ml-1" src={manage} alt="" />
          </Link>
        </div>
        <div className="h-40 flex justify-evenly items-center bg-green-400 rounded-xl shadow-inner shadow-blue-400">
          <div>
            <h5 className="font-bold font-serif text-2xl text-white mb-0 pb-0">
              {orders.length}
            </h5>
            <h2 className="font-bold font-serif text-lg text-white mt-0 pt-0">
              Orders
            </h2>
          </div>
          <Link to="orders" className="flex  btn btn-ghost btn-sm">
            <h3 className="font-semibold font-serif text-white normal-case">
              Details
            </h3>
            <img className="w-5 ml-1" src={orderManage} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
