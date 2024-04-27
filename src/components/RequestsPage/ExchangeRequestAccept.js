import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ExchangeRequestAccept = () => {
  const { bookId } = useParams();
  const [value, onChange] = useState(new Date());
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://boi-exchange-server.onrender.com/exchange/book/${bookId}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [bookId, setBook]);

  const handleSend = () => {
    const message = document.getElementById("messageAccept").value;
    const requestResult = {
      message: message,
      date: value.toDateString(),
      time: value.toLocaleTimeString(),
      requesterEmail: book?.requesterDetails?.email,
    };

    fetch(
      `https://boi-exchange-server.onrender.com/exchange/accept/${bookId}`,
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
    toast.success("Message Sent Successfully!");
    navigate("/");
  };

  return (
    <>
      <div className="lg:flex lg:justify-center lg:items-center w-full h-screen">
        <div className="bg-cyan-100 w-1/3 flex flex-col justify-center items-center py-6 rounded-full shadow-lg">
          <p className="font-bold text-lg mb-3">Enter Message &#x2935;</p>
          <textarea
            className="textarea-success"
            name="messageAccept"
            id="messageAccept"
            cols="33"
            rows="5"
            required
          ></textarea>
          <p className="font-bold text-lg my-3">Pick a Date &#x2935;</p>
          <DateTimePicker onChange={onChange} value={value} />
          <button
            onClick={handleSend}
            className="btn btn-sm text-white font-bold btn-success hover:rounded-full hover:bg-white hover:border-2 hover:text-success mt-3"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ExchangeRequestAccept;
