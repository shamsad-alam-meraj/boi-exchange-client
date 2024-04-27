import { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://boi-exchange-server.onrender.com/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return [users];
};

export default useUsers;
