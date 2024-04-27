import React from "react";
import { Link } from "react-router-dom";
import useBooks from "../../hooks/useBooks";
import Loading from "../Loading/Loading";
import addBook from "../../assets/images/logo/addBook.png";
import useAdmin from "../../hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useLibrarian from "../../hooks/useLibrarian";

const Books = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [librarian] = useLibrarian(user);
  const [books, setBooks] = useBooks();
  if (books.length === 0) {
    return <Loading></Loading>;
  }
  const handleDelete = (book) => {
    const indexOfBook = books.indexOf(book);
    books.splice(indexOfBook, 1);
    const restBooks = [...books];
    setBooks(restBooks);
    fetch(`https://boi-exchange-server.onrender.com/book/${book._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        window.location.reload(false);
      });
  };

  return (
    <div className="bg-black  pt-5 px-2">
      <h1 className="font-bold font-serif text-white text-center text-2xl my-5">
        Books for Sale of
        <span className="text-blue-500 border-red-300 ml-2  border-b-2">
          Boi Exchange
        </span>
      </h1>
      <h1 className="font-bold font-serif text-white text-center text-2xl ">
        Total Books : {books.length}
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
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 mt-5">
        {books.map((book) => (
          <div
            key={book._id}
            className="flex justify-center items-center flex-col bg-gray-800 py-3 rounded-xl"
          >
            <img className="w-40 h-44 rounded-lg" src={book.image} alt="" />
            <h1 className="text-white font-serif text-xs mt-2">{book.name}</h1>
            <button
              onClick={() => handleDelete(book)}
              className="btn btn-xs btn-error mt-1 hover:bg-transparent hover:text-error"
            >
              Delete
            </button>
          </div>
        ))}
        <Link
          to="addBook"
          className="flex justify-center items-center flex-col bg-gray-800 py-3 rounded-xl"
        >
          <h1 className="font-bold font-serif text-white">Add book</h1>
          <img className="w-4" src={addBook} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Books;
