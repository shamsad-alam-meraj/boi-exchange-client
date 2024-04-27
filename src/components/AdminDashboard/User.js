import React from "react";

const User = ({ serial, user }) => {
  const handleMakeAdmin = () => {
    fetch(`https://boi-exchange-server.onrender.com/user/admin/${user.email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          alert(`Failed to Make Admin ${user.admin}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert(`Successfully made ${user.email}`);
          window.location.reload(false);
        }
      });
  };
  const handleRemoveAccess = () => {
    fetch(
      `https://boi-exchange-server.onrender.com/user/removeAdmin/${user.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403) {
          alert(`Failed to remove Admin ${user.email}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert(`Successfully removed ${user.email}`);
          window.location.reload(false);
        }
      });
  };
  return (
    <>
      <tr>
        <th className="font-serif">{serial}</th>
        <td className="font-serif">{user.email}</td>
        <td className="font-serif">
          {user.role === "admin" && "Admin"}
          {user.role === "librarian" && "Librarian"}
          {!user.role && "Normal User"}
        </td>

        <td>
          {user.role === "admin" && (
            <button
              onClick={handleRemoveAccess}
              className="btn btn-xs btn-error text-white font-serif hover:bg-white hover:text-error"
            >
              Remove Access
            </button>
          )}
          {user.role === "librarian" && (
            <button
              disabled
              onClick={handleRemoveAccess}
              className="btn btn-xs btn-error text-white font-serif hover:bg-white hover:text-error"
            >
              Remove Access
            </button>
          )}
          {!user.role && (
            <button
              onClick={handleMakeAdmin}
              className="btn btn-xs btn-success text-white font-serif hover:bg-white hover:text-success "
            >
              Make Admin
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default User;
