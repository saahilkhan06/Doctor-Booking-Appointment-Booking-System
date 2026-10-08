import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.family} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Your trusted healthcare partner, connecting patients with qualified
            doctors through a seamless appointment booking experience. We are
            committed to making healthcare accessible, convenient, and reliable
            for everyone. Book appointments, manage consultations, and take
            charge of your health with confidence.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Mentor by: Farhat Mirza </li>
            <li>
              <a href="mailto:mentorbyfarhat@gmail.com">
                mentorbyfarhat@gmail.com
              </a>
            </li>{" "}
            <li>Developed by : Saahil Khan</li>
            <li><a href="mailto:saahilkhan3838@gmail.com">saahilkhan3838@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ Prescripto.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
