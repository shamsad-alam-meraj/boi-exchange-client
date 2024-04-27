import React from "react";
import logo from "../../assets/images/logo/minilogo.png";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-cyan-50 text-base-content">
      <div>
        <img className="w-20 h-20" src={logo} alt="" />
        <p className="font-serif">
          <span className="font-bold font-serif">Boi Exchange </span>
          <br />
          Providing reliable exchange books since 2020
        </p>
        <h3 className="font-serif">
          Designed & Developed By -
          <a
            className="text-green-600 font-bold"
            href="https://my-portfolio-meraj.web.app/"
            target="_blank"
            rel="noreferrer"
          >
            Meraj
          </a>
        </h3>
      </div>
      <div>
        <span className="footer-title font-serif">Services</span>
        <a href="/" className="link link-hover font-serif">
          Branding
        </a>
        <a href="/" className="link link-hover font-serif">
          Design
        </a>
        <a href="/" className="link link-hover font-serif">
          Marketing
        </a>
        <a href="/" className="link link-hover font-serif">
          Advertisement
        </a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a href="/" className="link link-hover font-serif">
          About us
        </a>
        <a href="/" className="link link-hover font-serif">
          Contact
        </a>
        <a href="/" className="link link-hover font-serif">
          Jobs
        </a>
        <a href="/" className="link link-hover font-serif">
          Press kit
        </a>
      </div>
      <div>
        <span className="footer-title font-serif">Legal</span>
        <a href="/" className="link link-hover font-serif">
          Terms of use
        </a>
        <a href="/" className="link link-hover font-serif">
          Privacy policy
        </a>
        <a href="/" className="link link-hover font-serif">
          Cookie policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
