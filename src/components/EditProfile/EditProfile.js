import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const EditProfile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    const userLocation = event.target.userLocation.value;
    const phoneNumber = event.target.userContact.value;
    const image = event.target.image.files[0];
    let formData = new FormData();
    formData.append("image", image);
    const imageStorageKey = `ff0ddab986e357675f654a478f646949`;
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const photoURL = result.data.url;
          fetch(
            `https://boi-exchange-server.onrender.com/user/${user?.email}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify({
                userLocation,
                phoneNumber,
                photoURL,
              }),
            }
          )
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted) {
                toast.success("Profile Updated Successfully!");
                navigate("/myProfile");
              } else {
                toast.error("Failed Update Now, try again later!");
              }
            });
        }
      });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
        {" "}
        <h4 className="font-bold text-xl font-serif my-3 text-center border-b-2 border-success">
          Update Your Profile
        </h4>
        <form
          onSubmit={handleUpdate}
          className="py-3 px-10 bg-cyan-100 shadow-inner shadow-success  rounded-xl"
        >
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
          <p className="font-semibold my-1 font-mono">
            Change Profile Picture:
          </p>
          {user?.photoURL ? (
            <input
              className="file file-bordered file-success w-full max-w-xs file-sm"
              type="file"
              name="image"
              id="image"
              disabled
            />
          ) : (
            <input
              className="file file-bordered file-success w-full max-w-xs file-sm"
              type="file"
              name="image"
              id="image"
              required
            />
          )}
          <p className="font-semibold my-1 font-mono">Your Location:</p>
          <input
            className="input input-bordered input-success w-full max-w-xs input-sm"
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
          <div className="flex justify-center">
            <input
              type="submit"
              value="Update"
              className="btn w-1/2 btn-sm text-white font-bold btn-success hover:rounded-full hover:bg-white hover:border-2 hover:text-success mt-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
