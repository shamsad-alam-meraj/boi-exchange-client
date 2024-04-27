import { useEffect } from "react";
import { useState } from "react";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://boi-exchange-server.onrender.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return [books, setBooks];
};

export default useBooks;
