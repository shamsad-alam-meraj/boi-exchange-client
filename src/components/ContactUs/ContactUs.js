import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_72t6erl",
        "template_pvdczqk",
        form.current,
        "uVFheahOgvLSJceup"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="mb-10">
      <h1 className="text-center font-serif font-bold text-green-600 text-3xl mb-5">
        Contact Us
      </h1>
      <div id="contact" className="rounded-lg bg-cyan-50">
        <div className="hero ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div
              className="text-center lg:text-left lg:pl-10 w-1/2"
              data-aos="flip-down"
              data-aos-duration="1100"
            >
              <h1 className="text-5xl  font-bold font-serif">Get In Touch!</h1>
              <p className="py-6 font-serif">
                Send us email if you think we can help you out with any of your
                Book Exchange or, Borrow Related Problem.
              </p>
            </div>
            <div
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl my-10 bg-cyan-100"
              data-aos="fade-right"
              data-aos-duration="1100"
            >
              <form ref={form} onSubmit={sendEmail} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="user_email"
                    placeholder="Email"
                    className="input input-bordered "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="textarea  rounded"
                    required
                    name="message"
                    id="message"
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn font-serif hover:bg-white hover:border-2 hover:text-black hover:ease-in hover:duration-500 duration-500 ease-out text-white font-bold hover:font-bold hover:rounded-full"
                    value="Send"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
