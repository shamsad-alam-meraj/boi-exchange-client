import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetch(`https://boi-exchange-server.onrender.com/order/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, [user]);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Book Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {myOrders.map((order, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{order.bookName}</td>
                <td>{order.price}</td>
                <td>
                  {order?.paid ? (
                    <h1 className="font-bold font-serif text-lg text-success">
                      Paid
                    </h1>
                  ) : (
                    <Link
                      className="btn btn-sm btn-success text-white font-serif normal-case font-bold hover:rounded-full hover:text-success hover:bg-white border-2"
                      to={`/dashboard/makePayment/${order._id}`}
                    >
                      Make Payment
                    </Link>
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

export default MyOrders;
