import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { toast } from "react-hot-toast";
import auth from "../../firebase.init";

const AddBookExchange = () => {
  const [user] = useAuthState(auth);
  const imageStorageKey = `ff0ddab986e357675f654a478f646949`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.bookName.value;
    const category = event.target.category.value;
    const writter = event.target.writer.value;
    const image = event.target.image.files[0];
    const interestedBooksType = event.target.interestedBook.value;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userLocation = event.target.userLocation.value;
    const userContact = event.target.userContact.value;
    let formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          // send to database
          fetch("https://boi-exchange-server.onrender.com/exchange", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              name,
              category,
              writter,
              image,
              interestedBooksType,
              userName,
              userEmail,
              userLocation,
              userContact,
            }),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Book added successfully");
              } else {
                toast.error("Failed to add this book, try again!");
              }
            });
        }
      });
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="py-3 px-10 bg-cyan-100 shadow-inner shadow-success  rounded-xl"
      >
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid flex-grow  rounded-box place-items-center">
            <div className="flex flex-col justify-center items-center ">
              <h4 className="font-bold text-xl font-serif my-3 text-center">
                Book Information
              </h4>
              <hr className="border-2 border-success" />
              <p className="font-semibold my-1 font-mono">Book Name:</p>
              <input
                className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
                type="text"
                name="bookName"
                id="bookName"
                required
              />
              <p className="font-semibold my-1 font-mono">Category:</p>
              <input
                className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
                type="text"
                name="category"
                id="category"
                required
              />
              <p className="font-semibold my-1 font-mono">Book Writer:</p>
              <input
                className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
                type="text"
                name="writer"
                id="writer"
                required
              />
              <p className="font-semibold my-1 font-mono">Image:</p>
              <input
                className="file-input file-input-bordered file-input-sm w-full max-w-xs file-input-success"
                type="file"
                name="image"
                id="image"
                required
              />
              <p className="font-semibold my-1 font-mono">
                Interested Book for exchange:
              </p>
              <input
                className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
                type="text"
                name="interestedBook"
                id="interestedBook"
                required
              />
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
            {" "}
            <h4 className="font-bold text-xl font-serif my-3 text-center">
              User Information
            </h4>
            <hr className="border-2 border-success" />
            <p className="font-semibold my-1 font-mono">Your Name:</p>
            <input
              className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
              type="text"
              name="userName"
              id="userName"
              value={user?.displayName}
              disabled
            />
            <p className="font-semibold my-1 font-mono">Your Email:</p>
            <input
              className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
              type="email"
              name="userEmail"
              id="userEmail"
              value={user?.email}
              disabled
            />
            <p className="font-semibold my-1 font-mono">Your Location:</p>
            <input
              className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
              type="text"
              name="userLocation"
              id="userLocation"
              required
            />
            <p className="font-semibold my-1 font-mono">Phone:</p>
            <input
              className="input input-bordered input-success w-full max-w-xs input-sm font-mono"
              type="text"
              name="userContact"
              id="userContact"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Add"
            className="btn w-1/2 btn-sm text-white font-bold btn-success hover:rounded-full hover:bg-white hover:border-2 hover:text-success mt-5"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBookExchange;
