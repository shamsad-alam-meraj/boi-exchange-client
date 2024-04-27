import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import Books from "./Books";

const ExchangePage = () => {
  const [user] = useAuthState(auth);
  const [booksMine, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://boi-exchange-server.onrender.com/exchange")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  const books = [];
  for (const book of booksMine) {
    if (book.userEmail !== user?.email) {
      books.push(book);
    }
  }

  if (booksMine.length === 0) {
    return <Loading></Loading>;
  }
  return (
    <>
      {user ? (
        <div>
          <h1 className="text-center font-serif font-bold text-green-600 text-3xl py-5">
            Books Available For Exchange
          </h1>
          <div className=" w-full mx-auto">
            {books.map((book) => (
              <Books key={books.indexOf(book)} book={book}></Books>
            ))}
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <div>
          <h1 className="text-center font-serif font-bold text-green-600 text-3xl py-5">
            Books Available For Exchange
          </h1>
          <div className=" w-full mx-auto">
            {booksMine.map((book) => (
              <Books key={books.indexOf(book)} book={book}></Books>
            ))}
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default ExchangePage;
