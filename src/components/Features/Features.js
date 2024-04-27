import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div>
      <h1 className="text-center font-serif font-bold text-green-600 text-3xl py-5 my-5">
        Services
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5">
        {/* feature 01 */}
        <div className="card bg-cyan-50 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/TPR6gYh/feature2.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-serif">Buy & Sell Books</h2>
            <p className="font-serif">
              Here, You can buy a book and also sell read books.
            </p>
            <div className="card-actions">
              <Link
                to="/store"
                className="btn btn-sm btn-outline hover:rounded-full font-serif"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        {/* feature 02 */}
        <div className="card bg-cyan-50 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/KDhyWjN/feature1.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-serif">Borrow & Return Book</h2>
            <p className="font-serif">
              Here, You can borrow a book by giving a returning date.
            </p>
            <div className="card-actions">
              <Link
                to="/borrow"
                className="btn btn-sm btn-outline hover:rounded-full font-serif"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        {/* feature 03 */}
        <div className="card bg-cyan-50 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/gvmpgYb/feature3.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-serif">Give & Take Book</h2>
            <p className="font-serif">
              Here, You can exchange your book with other users.
            </p>
            <div className="card-actions">
              <Link
                to="/exchange"
                className="btn btn-sm btn-outline hover:rounded-full font-serif"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
