import React, { useState } from "react";
import useBooks from "../../hooks/useBooks";
import Footer from "../Footer/Footer";
import Book from "./Book";
import searchBook from "../../assets/images/logo/searchBook.png";
import { Link, Outlet } from "react-router-dom";
import SearchBooks from "../SearchBooks/SearchBooks";

const Store = () => {
  const [books, setBooks] = useBooks();
  const [searchResult, setSearchResult] = useState([]);
  const [categoryResult, setCategoryResult] = useState([]);
  const [writerResult, setWriterResult] = useState([]);

  const handleSearch = () => {
    const searchText = document.getElementById("searchText").value;
    const url = `https://boi-exchange-server.onrender.com/book?name=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSearchResult(data));
    setBooks([]);
  };

  const handleCategory = (category) => {
    fetch(`https://boi-exchange-server.onrender.com/book/category/${category}`)
      .then((res) => res.json())
      .then((data) => setCategoryResult(data));
    setBooks([]);
  };
  const handleWriter = (writer) => {
    fetch(`https://boi-exchange-server.onrender.com/book/writer/${writer}`)
      .then((res) => res.json())
      .then((data) => setWriterResult(data));
    setBooks([]);
  };

  return (
    <div>
      <h1 className="text-center font-serif font-bold text-green-600 text-3xl py-5">
        Book Store
      </h1>
      <div className="flex justify-center w-full items-center mb-5">
        <div className="w-1/2 lg:w-1/3 flex">
          <input
            className="input w-full input-sm input-success font-serif"
            name="searchText"
            id="searchText"
            type="text"
            placeholder="Enter Book Name"
          />
          <button
            onClick={handleSearch}
            className="btn btn-ghost btn-xs hover:bg-transparent rounded-full"
          >
            <img className="w-6 rounded-full" src={searchBook} alt="" />
          </button>
        </div>
      </div>
      <Outlet></Outlet>
      <div className="flex justify-center my-3">
        {searchResult.length > 0 && (
          <Link
            onClick={(() => setSearchResult([]), books)}
            to="/store"
            className="btn btn-xs btn-warning text-white font-serif"
          >
            Back
          </Link>
        )}
        {writerResult.length > 0 && (
          <Link
            onClick={(() => setWriterResult([]), books)}
            to="/store"
            className="btn btn-xs btn-warning text-white font-serif"
          >
            Back
          </Link>
        )}
        {categoryResult.length > 0 && (
          <Link
            onClick={(() => setCategoryResult([]), books)}
            to="/store"
            className="btn btn-xs btn-warning text-white font-serif"
          >
            Back
          </Link>
        )}
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 px-8 mb-4">
        {searchResult &&
          searchResult.map((book) => {
            return <SearchBooks key={book.id} book={book}></SearchBooks>;
          })}
        {writerResult &&
          writerResult.map((book) => <Book book={book} key={book._id}></Book>)}
        {categoryResult &&
          categoryResult.map((book) => (
            <Book book={book} key={book._id}></Book>
          ))}
        {searchResult &&
          books.map((book) => {
            return (
              <Book
                handleCategory={handleCategory}
                handleWriter={handleWriter}
                key={book._id}
                book={book}
              ></Book>
            );
          })}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Store;
