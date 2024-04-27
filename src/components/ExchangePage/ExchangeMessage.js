import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import verifyLogo from "../../assets/images/logo/verify-logo.png";
import verified from "../../assets/images/logo/verify.png";
import auth from "../../firebase.init";
import Footer from "../Footer/Footer";

const ExchangeMessage = () => {
  const [user] = useAuthState(auth);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const requesterName = event.target.name.value;
    const requesterPhone = event.target.phone.value;
    const requesterAddress = event.target.address.value;
    const requesterBook = event.target.bookName.value;
    const email = user.email;

    const requesterDetails = {
      name: requesterName,
      phone: requesterPhone,
      address: requesterAddress,
      book: requesterBook,
      email: email,
    };

    fetch(`https://boi-exchange-server.onrender.com/exchange/${bookId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requesterDetails),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    // alert("Request Sent Successfully!");
    toast.success("Request Sent Successfully");
    navigate("/");
  };
  if (sending) {
    toast.success("Sending...Check Your Email..!");
  }
  if (error) {
    toast.error("Something Error...!");
  }

  const handleVerify = async () => {
    await sendEmailVerification();
  };
  return (
    <div>
      <div className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
        <div className="border rounded shadow-xl p-10 bg-cyan-50">
          <h1 className="text-center font-serif font-semibold">
            Verify your Account
          </h1>
          <h3 className="text-center font-serif">
            You can verify your account to use this exchange system securely.
          </h3>
          <div className="flex justify-center items-center">
            <img className="w-52 h-56" src={verifyLogo} alt="" />
          </div>
          <div className="flex justify-center items-center mt-3">
            {user?.emailVerified ? (
              <div className="flex bg-black rounded-full px-3">
                {" "}
                <h2 className="font-serif font-semibold  text-success  ">
                  Your Account is Verified
                </h2>
                <img className="w-6" src={verified} alt="" />
              </div>
            ) : (
              <button
                onClick={handleVerify}
                className="btn btn-xs btn-success font-serif text-white normal-case hover:bg-white hover:text-success"
              >
                Verify
              </button>
            )}
          </div>
        </div>
        <div className="border rounded-lg shadow-xl py-10 bg-cyan-50">
          <h1 className="text-warning font-semibold text-xl text-center font-serif">
            Your Request will Send after Submit the Form!
          </h1>
          <h1 className="text-center mb-10 font-serif">
            Please, Give some important information!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4">
              <div className="flex">
                <h2 className="font-semibold text-lg mr-4 font-serif">Name:</h2>
                <input
                  placeholder="Your Name"
                  required
                  className="input input-bordered input-sm w-full max-w-xs font-serif"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="flex">
                <h2 className="font-semibold text-lg mr-4 font-serif">
                  Phone:
                </h2>
                <input
                  placeholder="Phone Number"
                  required
                  className="input input-bordered input-sm w-full max-w-xs font-serif"
                  type="text"
                  name="phone"
                  id="phone"
                />
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="flex">
                <h2 className="font-semibold text-lg mr-3 font-serif">
                  Address:
                </h2>
                <input
                  placeholder="Your Address"
                  required
                  className="input input-bordered input-sm w-full max-w-xs font-serif"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="flex">
                <h2 className="font-semibold text-lg mr-4 font-serif">Book:</h2>
                <input
                  placeholder="Book Name for Exchange"
                  required
                  className="input input-bordered input-sm w-full max-w-xs font-serif"
                  type="text"
                  name="bookName"
                  id="bookName"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                className="btn btn-sm btn-outline hover:rounded-full font-semibold font-serif"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ExchangeMessage;
