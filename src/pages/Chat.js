import axios from "axios";
import React, { useState } from "react";

const initialValue = {
  email: "",
  name: "",
  fromName: "",
  fromEmail: "",
  subject: "",
  body: "",
};

const Chat = () => {
  const [inputs, setInputs] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // console.log(inputs);
  const sendEmail = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://100085.pythonanywhere.com/api/v1/mail/49c299a1-4311-48ea-863c-250a664f81e5/?type=send-email",
        inputs
      );

      console.log(result.data);
      alert("mail sent successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // setInputs({...inputs})
      e.target.reset()
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl">Send email</h2>
        <form className="flex flex-col gap-y-4 w-72 mt-6" onSubmit={sendEmail}>
          <input
            type="email"
            placeholder="receiver's email"
            className="border outline-none "
            onChange={onChangeHandler}
            name="email"
          />
          <input
            type="text"
            placeholder="receiver's name"
            className="border outline-none "
            onChange={onChangeHandler}
            name="name"
          />
          <input
            type="text"
            placeholder="sender's name"
            className="border outline-none "
            onChange={onChangeHandler}
            name="fromName"
          />
          <input
            type="email"
            placeholder="sender's email"
            className="border outline-none "
            onChange={onChangeHandler}
            name="fromEmail"
          />
          <input
            type="text"
            placeholder="subject"
            className="border outline-none "
            onChange={onChangeHandler}
            name="subject"
          />
          <textarea
            rows={3}
            placeholder="body"
            className="border outline-none resize-none"
            onChange={onChangeHandler}
            name="body"
          />
          <button
            type="submit"
            className="bg-black rounded-xl px-2 py-1 text-white h-12"
          >
            {loading ? "loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
