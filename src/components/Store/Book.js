import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useLibrarian from "../../hooks/useLibrarian";
import { useNavigate } from "react-router-dom";

const Book = ({ book, handleCategory, handleWriter }) => {
  const { _id, name, image, category, writter, price } = book;
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [librarian] = useLibrarian(user);
  const navigate = useNavigate();
  const handleBookNow = (bookId) => {
    navigate(`/buyNow/${bookId}`);
  };
  return (
    <div
      data-aos="fade-down"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      className="bg-cyan-50 rounded-lg shadow-lg"
    >
      <figure className="pt-2 pb-0">
        <div className="flex justify-center items-center">
          {" "}
          <img src={image} className="rounded-xl w-40" alt="" />
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title font-serif">{name}</h2>
        <p>
          <span className="font-bold font-serif">By</span>{" "}
          <span
            onClick={() => handleWriter(writter)}
            className="text-green-700 font-thin font-serif cursor-pointer"
          >
            {writter}
          </span>
        </p>
        <p>
          <span className="font-bold font-serif">Category: </span>
          <span
            onClick={() => handleCategory(category)}
            className="text-green-700 font-thin font-serif cursor-pointer"
          >
            {category}
          </span>
        </p>
        <p>
          <span className="font-bold font-serif">Price: </span>
          <span className="font-semibold font-serif">{price}</span>
        </p>
        <div className="card-actions">
          {admin && (
            <button
              disabled
              className="btn btn-sm btn-outline hover:rounded-full mt-3 font-serif"
            >
              Buy Now
            </button>
          )}
          {librarian ? (
            <button
              disabled
              className="btn btn-sm btn-outline hover:rounded-full mt-3 font-serif"
            >
              Buy Now{" "}
            </button>
          ) : (
            !admin && (
              <button
                onClick={() => handleBookNow(_id)}
                className="btn btn-sm btn-outline hover:rounded-full mt-3 font-serif"
              >
                Buy Now{" "}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
