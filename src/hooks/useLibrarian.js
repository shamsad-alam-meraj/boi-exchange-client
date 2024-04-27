import { useEffect, useState } from "react";

const useLibrarian = (user) => {
  const [librarian, setLibrarian] = useState(false);
  const [librarianLoading, setLibrarianLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`https://boi-exchange-server.onrender.com/librarian/${email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLibrarian(data.librarian);
          setLibrarianLoading(false);
        });
    }
  }, [user]);

  return [librarian, librarianLoading];
};

export default useLibrarian;
