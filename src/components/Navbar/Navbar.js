import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo/logo.png";
import userProfile from "../../assets/images/logo/userProfile.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useAdmin from "../../hooks/useAdmin";
import useExchangeRequest from "../../hooks/useExchangeRequest";
import useBorrowRequest from "../../hooks/useBorrowRequest";
import useLibrarian from "../../hooks/useLibrarian";
import useDbUser from "../../hooks/useDbUser";
import notify from "../../assets/images/logo/notification.png";
import notifyNone from "../../assets/images/logo/notification1.png";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [dbUser] = useDbUser();
  const navigate = useNavigate();
  const [admin] = useAdmin(user);
  const [librarian] = useLibrarian(user);
  const [myExchangeRequest] = useExchangeRequest();
  const [myBorrowRequest] = useBorrowRequest();
  let countForEx = 0;
  let countForBro = 0;
  const [exchangeResult, setExchangeResult] = useState([]);
  const [borrowResult, setBorrowResult] = useState([]);

  useEffect(() => {
    fetch(
      `https://boi-exchange-server.onrender.com/exchange/result/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setExchangeResult(data));
  }, [user]);
  useEffect(() => {
    fetch(
      `https://boi-exchange-server.onrender.com/borrow/result/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setBorrowResult(data));
  }, [user]);

  const handleTakenExchange = (book) => {
    fetch(
      `https://boi-exchange-server.onrender.com/exchange/book/${book._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(book),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Thanks for Using Us!");
        window.location.reload(false);
      });
  };
  const handleCancelExchange = (book) => {
    fetch(
      `https://boi-exchange-server.onrender.com/exchange/cancel/${book._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(book),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Canceled Successfully");
        window.location.reload(false);
      });
  };
  const handleExchangeOK = (book) => {
    fetch(
      `https://boi-exchange-server.onrender.com/exchange/cancel/${book._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(book),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Please try another one!");
        window.location.reload(false);
      });
  };
  const handleTakenBorrow = (book) => {
    fetch(`https://boi-exchange-server.onrender.com/borrow/book/${book._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Thanks for Using Us!");
        window.location.reload(false);
      });
  };

  const handleCancelBorrow = (book) => {
    fetch(
      `https://boi-exchange-server.onrender.com/borrow/cancel/${book._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(book),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Canceled Successfully");
        window.location.reload(false);
      });
  };
  const handleBorrowOK = (book) => {
    fetch(
      `https://boi-exchange-server.onrender.com/borrow/cancel/${book._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(book),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Please try another one!");
        window.location.reload(false);
      });
  };

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  for (let request of myExchangeRequest) {
    if (request?.requesterDetails) {
      countForEx++;
    }
  }
  for (let request of myBorrowRequest) {
    if (request?.requesterDetails) {
      countForBro++;
    }
  }
  const totalCount = countForEx + countForBro;

  return (
    <nav className="navbar ">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li>
            <Link className="hover:text-cyan-600 font-serif" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-cyan-600 font-serif" to="/store">
              Store
            </Link>
          </li>
          <li>
            <Link className="hover:text-cyan-600 font-serif" to="/exchange">
              Exchange
            </Link>
          </li>
          <li>
            <Link className="hover:text-cyan-600 font-serif" to="/borrow">
              Borrow
            </Link>
          </li>

          {totalCount > 0 && (
            <li>
              <Link className="hover:text-cyan-600 font-serif" to="/requests">
                Requests
                <div className="badge badge-error">
                  <p className="font-bold text-white">{totalCount}</p>
                </div>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <div className="dropdown dropdown-top lg:dropdown-left">
                <label tabIndex={0} className="w-7 rounded-full cursor-pointer">
                  <img className="w-7 mt-1" src={notify} alt="" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 pb-0 shadow bg-gray-50 rounded-box overflow-auto lg:overflow-y-auto lg:overflow-x-auto w-96 "
                >
                  {exchangeResult.map((result) => (
                    <li className="grid lg:grid-cols-2 grid-cols-1 mb-2 bg-cyan-100 rounded-lg overflow-x-scroll lg:overflow-auto">
                      <p className="font-serif text-xs hover:bg-transparent">
                        {result?.userName}{" "}
                        {result?.accept ? "accepted" : "rejected"} request for
                        Exchange - {result?.name}
                        <br />
                        {result?.message &&
                          `Message : ${result?.message} `}{" "}
                        <br />
                        {result?.date &&
                          `Meet Date: ${result?.date.slice(4, 15)} `}{" "}
                        <br />
                        {result?.time && `Meet Time: ${result?.time} `}
                      </p>
                      <div className="flex lg:justify-between items-center hover:bg-transparent">
                        {result?.accept ? (
                          <button
                            onClick={() => handleTakenExchange(result)}
                            className="font-serif text-xs btn-success btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-success"
                          >
                            Taken
                          </button>
                        ) : (
                          <button
                            disabled
                            className="font-serif text-xs btn-success btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-success "
                          >
                            Taken
                          </button>
                        )}
                        {result?.accept ? (
                          <button
                            onClick={() => handleCancelExchange(result)}
                            className="font-serif text-xs btn-error btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-error"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => handleExchangeOK(result)}
                            className="font-serif text-xs btn-error btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-error"
                          >
                            OK
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                  {borrowResult.map((result) => (
                    <li className="grid lg:grid-cols-2 grid-cols-1 mb-2 bg-cyan-100 rounded-lg overflow-x-scroll lg:overflow-auto">
                      <p className="font-serif text-xs hover:bg-transparent">
                        {result?.userName}{" "}
                        {result?.accept ? "accepted" : "rejected"} request for
                        Borrow - {result?.name}
                        <br />
                        {result?.message &&
                          `Message : ${result?.message} `}{" "}
                        <br />
                        {result?.date &&
                          `Date: ${result?.date.slice(4, 15)} `}{" "}
                        <br />
                        {result?.time && `Time: ${result?.time} `}
                      </p>
                      <div className="flex lg:justify-between items-center hover:bg-transparent">
                        {result?.accept ? (
                          <button
                            onClick={() => handleTakenBorrow(result)}
                            className="font-serif text-xs btn-success btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-success"
                          >
                            Taken
                          </button>
                        ) : (
                          <button
                            disabled
                            className="font-serif text-xs btn-success btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-success disabled"
                          >
                            Taken
                          </button>
                        )}
                        {result?.accept ? (
                          <button
                            onClick={() => handleCancelBorrow(result)}
                            className="font-serif text-xs btn-error btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-error"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBorrowOK(result)}
                            className="font-serif text-xs btn-error btn-xs btn hover:rounded-full normal-case text-white hover:bg-white hover:text-error disabled"
                          >
                            OK
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                  {borrowResult.length === 0 && exchangeResult.length === 0 && (
                    <li className="my-4 bg-cyan-100 rounded-lg">
                      <h1 className="font-serif text-center text-xs hover:bg-transparent cursor-wait">
                        <img className="w-4" src={notifyNone} alt="" /> There is
                        no notification for you!
                      </h1>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          )}

          <li>
            {user ? (
              <div className="dropdown lg:dropdown-left">
                {user?.photoURL && (
                  <label tabIndex={1} className="avatar">
                    <div className="w-7 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2 cursor-pointer">
                      <img src={user?.photoURL} alt="Profile" className="w-7" />
                    </div>
                  </label>
                )}
                {dbUser?.photoURL ? (
                  <label
                    tabIndex={1}
                    className="font-bold m-1 flex justify-center items-center"
                  >
                    <div className="w-7 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2 cursor-pointer">
                      <img
                        src={dbUser?.photoURL}
                        alt=""
                        className="w-7 rounded-full"
                      />
                    </div>
                  </label>
                ) : (
                  !user?.photoURL && (
                    <label
                      tabIndex={1}
                      className="font-bold m-1 flex justify-center items-center"
                    >
                      <div className="w-7 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2 cursor-pointer">
                        <img src={userProfile} alt="" className="w-7" />
                      </div>
                    </label>
                  )
                )}
                <ul
                  tabIndex={1}
                  className="dropdown-content menu p-2 pl-0 shadow bg-gray-50 rounded-box w-44"
                >
                  {admin && (
                    <li>
                      <Link
                        className="hover:bg-cyan-400 hover:text-white font-serif"
                        to="/admin/dashboard"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {librarian ? (
                    <li>
                      <Link
                        className="hover:bg-cyan-400 hover:text-white font-serif"
                        to="/librarian/dashboard"
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : (
                    !admin && (
                      <li>
                        <Link
                          className=" hover:bg-cyan-400 hover:text-white font-serif"
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )
                  )}
                  <li>
                    <Link
                      className="hover:bg-cyan-400 hover:text-white font-serif"
                      to="/myProfile"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <h1
                      className="hover:bg-cyan-400 hover:text-white font-serif"
                      onClick={logout}
                    >
                      Sign Out
                    </h1>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="hover:text-cyan-600 font-serif" to="/login">
                Log In
              </Link>
            )}
          </li>
        </ul>
        <Link to="/" className="logo">
          <img className="w-52" src={logo} alt="" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
