import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  if (sending) {
    toast.success("Sending...");
  }
  return (
    <div className="flex justify-center items-center  mt-5 ">
      <div className="flex flex-col justify-center items-center w-11/12 lg:w-1/4 bg-cyan-100 shadow-inner shadow-orange-300 px-2 py-5">
        <h1 className="font-semibold font-serif mb-2">Enter Your Email:</h1>
        <input
          className="input font-serif input-bordered input-success input-sm w-full mb-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Valid Email"
        />
        <button
          className="btn font-serif btn-sm btn-warning text-white normal-case hover:bg-white hover:rounded-full hover:text-warning"
          onClick={async () => {
            const success = await sendPasswordResetEmail(email);
            if (success) {
              toast.success("Email Sent! Check email inbox or, spam");
            }
          }}
        >
          Reset
        </button>
        <Link
          to="/login"
          className="btn lg:mt-2 font-serif btn-xs btn-success text-white normal-case hover:bg-white hover:rounded-full hover:text-success"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
