import React from "react";
import { useNavigate } from "react-router-dom";
import useBorrowRequest from "../../hooks/useBorrowRequest";
import useExchangeRequest from "../../hooks/useExchangeRequest";
import Loading from "../Loading/Loading";

const RequestsPage = () => {
  const [myExchangeRequest] = useExchangeRequest();
  const [myBorrowRequest] = useBorrowRequest();
  const navigate = useNavigate();

  if (myExchangeRequest.length === 0 && myBorrowRequest.length === 0) {
    return <Loading></Loading>;
  }

  const myRequest = myExchangeRequest;
  const myBRequest = myBorrowRequest;

  const handleExchangeAccept = (book) => {
    navigate(`/exchangeAcceptance/${book._id}`);
  };
  const handleBorrowAccept = (book) => {
    navigate(`/borrowAcceptance/${book._id}`);
  };
  const handleExchangeReject = (book) => {
    const requestResult = {
      requesterEmail: book?.requesterDetails?.email,
    };
    delete book.requesterDetails;
    fetch(
      `https://boi-exchange-server.onrender.com/exchange/reject/${book?._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestResult),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    navigate("/");
  };

  const handleBorrowReject = (book) => {
    const requestResult = {
      requesterEmail: book?.requesterDetails?.email,
    };
    delete book?.requesterDetails;
    fetch(
      `https://boi-exchange-server.onrender.com/borrow/reject/${book?._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestResult),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    // window.location.reload(false);
    navigate("/");
  };

  return (
    <>
      {myRequest.map(
        (m) =>
          m?.requesterDetails && (
            <div className="border rounded-lg flex justify-center items-center flex-col py-10 my-2 bg-cyan-100">
              <h1 className="text-lg  text-center my-2">
                <span className="font-bold">{m?.requesterDetails?.name} </span>
                sent you a request for book:{" "}
                <span className="font-bold">{m?.name} </span>!
              </h1>
              <p className="mb-2">
                Interested Book for{" "}
                <span className="font-bold text-red-900">Exchange</span>:{" "}
                <span className="font-semibold">
                  {m?.requesterDetails?.book}
                </span>
              </p>
              <div className="flex justify-around items-center w-1/2 mt-2">
                <button
                  onClick={() => handleExchangeAccept(m)}
                  className="btn btn-sm text-white font-bold btn-success hover:rounded-full hover:bg-white hover:border-2 hover:text-success"
                >
                  Accept
                </button>{" "}
                <button
                  onClick={() => handleExchangeReject(m)}
                  className="btn btn-sm text-white font-bold btn-error hover:rounded-full hover:bg-white hover:border-2 hover:text-error"
                >
                  Reject
                </button>
              </div>
            </div>
          )
      )}

      {myBRequest.map(
        (m) =>
          m?.requesterDetails && (
            <div className="border rounded-lg flex justify-center items-center flex-col py-10 my-2 bg-cyan-100">
              <h1 className="text-lg  text-center my-2">
                <span className="font-bold">{m?.requesterDetails?.name} </span>
                sent you a request for book:{" "}
                <span className="font-bold">{m?.name} </span>!
              </h1>
              <p className="mb-2">
                Will <span className="font-bold text-red-900">Borrow</span> for:{" "}
                <span className="font-semibold">
                  {m?.requesterDetails?.duration}
                </span>{" "}
                Days
              </p>
              <div className="flex justify-around items-center w-1/2 mt-2">
                <button
                  onClick={() => handleBorrowAccept(m)}
                  className="btn btn-sm text-white font-bold btn-success hover:rounded-full hover:bg-white hover:border-2 hover:text-success"
                >
                  Accept
                </button>{" "}
                <button
                  onClick={() => handleBorrowReject(m)}
                  className="btn btn-sm text-white font-bold btn-error hover:rounded-full hover:bg-white hover:border-2 hover:text-error"
                >
                  Reject
                </button>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default RequestsPage;
