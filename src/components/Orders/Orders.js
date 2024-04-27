import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useLibrarian from "../../hooks/useLibrarian";
import useOrders from "../../hooks/useOrders";

const Orders = () => {
  const [user] = useAuthState(auth);
  const [orders] = useOrders();
  const [admin] = useAdmin(user);
  const [librarian] = useLibrarian(user);

  return (
    <div className="bg-black mt-0 pt-3 w-full h-screen">
      <h1 className="font-serif font-bold text-2xl text-center mt-3 text-cyan-500">
        Orders
      </h1>
      <div className="flex justify-center my-3">
        {admin && (
          <Link
            to="/admin/dashboard"
            className="btn btn-xs btn-warning text-white font-serif"
          >
            Back
          </Link>
        )}
        {librarian && (
          <Link
            to="/librarian/dashboard"
            className="btn btn-xs btn-warning text-white font-serif"
          >
            Back
          </Link>
        )}
      </div>
      <div className="overflow-x-auto px-1 mt-4">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="font-serif">Serial No.</th>
              <th className="font-serif">Name</th>
              <th className="font-serif">Book Name</th>
              <th className="font-serif">Price</th>
              <th className="font-serif">Payment Status</th>
              <th className="font-serif">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {orders.map((order, index) => (
              <tr>
                <th className="font-serif">{index + 1}</th>
                <td className="font-serif">{order?.name}</td>
                <td className="font-serif">{order?.bookName}</td>
                <td className="font-serif">{order?.price}</td>
                <td className="font-serif">
                  {order?.paid ? "Paid" : "Not Paid"}
                </td>
                <td>
                  {order?.paid ? (
                    <button className="btn btn-success btn-xs font-serif">
                      Deliver
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-xs font-serif"
                      disabled
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
