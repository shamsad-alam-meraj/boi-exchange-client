import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const BuyNow = () => {
  const [user] = useAuthState(auth);
  const { bookId } = useParams();
  const [buyingBook, setBuyingBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://boi-exchange-server.onrender.com/book/${bookId}`)
      .then((res) => res.json())
      .then((data) => setBuyingBook(data));
  }, [bookId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = user?.displayName;
    const email = user?.email;
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const bookID = bookId;
    const bookName = buyingBook.name;
    const price = buyingBook.price;

    fetch("https://boi-exchange-server.onrender.com/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
        bookID,
        bookName,
        price,
      }),
    })
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Ordered Successfully..");
          navigate("/store");
        } else {
          toast.error("Failed to order this book, try again!");
        }
      });
  };

  return (
    <div className="px-12">
      <h1 className="text-center font-bold text-3xl mt-4 text-green-500 font-serif">
        Thanks for Choosing Us!
      </h1>
      <p className="text-center font-thin text-pink-500 font-serif">
        Please Give Your Information <br /> for Delivery The Books!
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-4">
        <div className="card bg-cyan-50 pt-3 shadow-xl">
          <figure>
            <img
              className="w-44 rounded-lg"
              src={buyingBook.image}
              alt="Book"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title font-serif">{buyingBook.name}</h2>
            <p className="font-serif">By {buyingBook.writter}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline font-serif">
                {buyingBook.category}
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-cyan-50 rounded-xl pt-3 px-2 shadow-xl"
        >
          <div className="form-control mt-5">
            <label className="input-group input-group-vertical">
              <span className="font-semibold font-serif">Name</span>
              <input
                type="text"
                name="name"
                id="name"
                value={user?.displayName}
                disabled
                className="input input-bordered font-mono"
              />
            </label>
          </div>
          <div className="form-control mt-3">
            <label className="input-group input-group-vertical">
              <span className="font-semibold font-serif">Email</span>
              <input
                type="email"
                name="email"
                id="email"
                value={user?.email}
                disabled
                className="input input-bordered font-mono"
              />
            </label>
          </div>
          <div className="form-control mt-3">
            <label className="input-group input-group-vertical">
              <span className="font-semibold font-serif">Phone</span>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter a valid phone number"
                className="input input-bordered font-mono"
              />
            </label>
          </div>
          <div className="form-control mt-3">
            <label className="input-group input-group-vertical">
              <span className="font-semibold font-serif">Address</span>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                className="input input-bordered font-mono"
              />
            </label>
          </div>
          <input
            // onClick={handleSubmit}
            type="submit"
            value="Submit"
            className="btn btn-success hover:bg-white mb-3 text-white hover:text-success font-bold hover:rounded-full font-serif mt-3 w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default BuyNow;
