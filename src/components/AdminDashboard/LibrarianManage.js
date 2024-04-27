import React from "react";
import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import SingleUser from "./SingleUser";

const LibrarianManage = () => {
  const [users] = useUsers();

  return (
    <div className="bg-black h-screen pt-5">
      <h1 className="font-bold font-serif text-white text-center text-2xl my-5">
        Users of
        <span className="text-blue-500 border-red-300 ml-2  border-b-2">
          Boi Exchange
        </span>
      </h1>
      <h3 className="font-bold font-serif text-white text-center text-xl">Librarian Management</h3>
      <div className="flex justify-center my-3">
        <Link
          to="/admin/dashboard"
          className="btn btn-xs btn-warning text-white font-serif"
        >
          Back
        </Link>
      </div>

      <div className="overflow-x-auto flex justify-center">
        <table className="table w-3/4">
          <thead>
            <tr>
              <th className="font-serif">Serial</th>
              <th className="font-serif">Email</th>
              <th className="font-serif">Role</th>
              <th className="font-serif">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <SingleUser
                serial={index + 1}
                user={user}
                key={user._id}
              ></SingleUser>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianManage;
