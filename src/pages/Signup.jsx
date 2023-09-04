import React, { useState } from "react";
import book from "../assets/book.svg";
import hero from "../assets/hero.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
   
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post("http://localhost:8000/api/auth/register", inputs)
        .then((res) => {
          console.log(res.data);
          navigate("/login");
          setLoading(false);
          alert("User registered successfully!!");
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center bg-[#E5E5E5] ">
      <main className="w-[500px] bg-white px-6 pb-6 overflow-auto">
        <header className="flex items-center gap-4 mt-12">
          <img src={book} alt="book" />
          <p className="text-lg roboto">DevNote</p>
        </header>

        <div className="mt-12">
          <img src={hero} alt="" className="w-full" />
          <p className="text-lg roboto text-center">Sign up</p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-12">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
            type="email"
            value={inputs.email}
            name="email"
            placeholder="Email address"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
            type="password"
            value={inputs.password}
            name="password"
            placeholder="Password"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <button className="bg-[#FB6900] text-white text-lg h-14 rounded-[5px] roboto">
            Sign up
          </button>
        </form>
        <a
          href="/login"
          className="roboto text-[#FB6900] flex justify-center mt-4"
        >
          Registered? Login here
        </a>
      </main>
    </div>
  );
}
