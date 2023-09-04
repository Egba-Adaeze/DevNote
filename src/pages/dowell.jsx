import React, { useEffect, useState } from "react";
import axios from "axios";
import { eventData } from "../components/data";
import ReactPaginate from "react-paginate";

const Dowell = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  const [input, setInput] = useState("");
  const [formData, setFormData] = useState([]);
  const [formValue, setFormValue] = useState({
    username: "",
    orientation: "",
    scalecolor: "",
    roundcolor: "",
    fontcolor: "",
    fomat: "",
    time: "",
    name: "",
    left: "",
    right: "",
    center: "",
  });

  const handleOnchange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 20;
  const pageCount = Math.ceil(eventData.data.data.length / PER_PAGE);

  function handlePageclick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://100035.pythonanywhere.com/api/nps_settings/${input}`
      );
      const results = response.data.payload.data;
      setEvents(results);
      setIsLoading(false);
      console.log(
        response.data.payload.data.map((id) => id.settings.name),
        "results"
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formValue.username,
      orientation: formValue.orientation,
      scalecolor: formValue.scalecolor,
      roundcolor: formValue.roundcolor,
      fontcolor: formValue.fontcolor,
      fomat: formValue.fomat,
      time: formValue.time,
      name: formValue.name,
      left: formValue.left,
      right: formValue.right,
      center: formValue.center,
    };
    try {
      const response = await axios.post(
        `https://100035.pythonanywhere.com/api/nps_settings/`,
        data
      );
      const results = response.data.payload.settings;
      setFormData(results);
      setIsLoadingForm(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Event List</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="enter text"
          className="border outline-none "
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-black rounded-xl px-2 py-1 text-white">
          Submit
        </button>
      </form>
      <ul>
        {events.map((item) => {
          return (
            <div key={item._id} className="flex flex-col justify-center gap-3">
              <p>orientation: {item.settings.orientation}</p>

              <p>
                scalecolor:{" "}
                <button
                  className="w-40"
                  style={{
                    background: `${item.settings.scalecolor}`,
                    color: `${item.settings.scalecolor}`,
                  }}
                >
                  ll
                </button>
              </p>
              <p>numberrating: {item.settings.numberrating}</p>
              <p>no_of_scales: {item.settings.no_of_scales}</p>
              <p>
                roundcolor:{" "}
                <button
                  className="w-40"
                  style={{
                    background: `${item.settings.roundcolor}`,
                    color: `${item.settings.roundcolor}`,
                  }}
                >
                  o
                </button>
              </p>
              <p>
                fontcolor:{" "}
                <button
                  className="w-40"
                  style={{
                    background: `${item.settings.fontcolor}`,
                    color: `${item.settings.fontcolor}`,
                  }}
                >
                  l
                </button>
              </p>
              <p>fomat: {item.settings.fomat}</p>
              <p>time: {item.settings.time}</p>
              <p>template_name: {item.settings.template_name}</p>
              <p>name: {item.settings.name}</p>
              <p>scale-category: {item.settings["scale-category"]}</p>
              <p>date_updated: {item.settings.date_updated}</p>
            </div>
          );
        })}
      </ul>

      <section className="mt-12">
        <h2 className="text-2xl">To make a post</h2>
        <form className="flex flex-col" onSubmit={postSubmit}>
          <label className="flex gap-4">
            username:
            <input
              type="text"
              placeholder="username"
              className="border outline-none "
              onChange={handleOnchange}
              name="username"
            />
          </label>
          <label className="flex gap-4">
            orientation:
            <input
              type="text"
              placeholder="orientation"
              className="border outline-none "
              onChange={handleOnchange}
              name="orientation"
            />
          </label>
          <label className="flex gap-4">
            scalecolor:
            <input
              type="text"
              placeholder="scalecolor"
              className="border outline-none "
              onChange={handleOnchange}
              name="scalecolor"
            />
          </label>
          <label className="flex gap-4">
            roundcolor:
            <input
              type="text"
              placeholder="roundcolor"
              className="border outline-none "
              onChange={handleOnchange}
              name="roundcolor"
            />
          </label>
          <label className="flex gap-4">
            fontcolor:
            <input
              type="text"
              placeholder="fontcolor"
              className="border outline-none "
              onChange={handleOnchange}
              name="fontcolor"
            />
          </label>
          <label className="flex gap-4">
            fomat:
            <input
              type="text"
              placeholder="fomat"
              className="border outline-none "
              onChange={handleOnchange}
              name="fomat"
            />
          </label>
          <label className="flex gap-4">
            time:
            <input
              type="text"
              placeholder="time"
              className="border outline-none "
              onChange={handleOnchange}
              name="time"
            />
          </label>
          <label className="flex gap-4">
            name:
            <input
              type="text"
              placeholder="name"
              className="border outline-none "
              onChange={handleOnchange}
              name="name"
            />
          </label>
          <label className="flex gap-4">
            left:
            <input
              type="text"
              placeholder="left"
              className="border outline-none "
              onChange={handleOnchange}
              name="left"
            />
          </label>
          <label className="flex gap-4">
            right:
            <input
              type="text"
              placeholder="right"
              className="border outline-none "
              onChange={handleOnchange}
              name="right"
            />
          </label>
          <label className="flex gap-4">
            center:
            <input
              type="text"
              placeholder="center"
              className="border outline-none "
              onChange={handleOnchange}
              name="center"
            />
          </label>
          <button className="bg-black rounded-xl px-2 py-1 text-white mt-6">
            Submit
          </button>
        </form>

        {isLoadingForm && <div>Loading...</div>}
        <ul>
          {formData.length > 0 && (
            <>
              <p>orientation: {formData.orientation}</p>

              <p>
                scalecolor:{" "}
                <button
                  className="w-40"
                  style={{
                    background: `${formData.scalecolor}`,
                    color: `${formData.scalecolor}`,
                  }}
                >
                  ll
                </button>
              </p>
              <p>numberrating: {formData.numberrating}</p>
              <p>no_of_scales: {formData.no_of_scales}</p>
              <p>
                roundcolor:{" "}
                <button
                  className="w-40"
                  style={{
                    background: `${formData.roundcolor}`,
                    color: `${formData.roundcolor}`,
                  }}
                >
                  o
                </button>
              </p>
              <p>
                fontcolor:{" "}
                <button
                  className="w-40"
                  style={{
                    background: `${formData.fontcolor}`,
                    color: `${formData.fontcolor}`,
                  }}
                >
                  l
                </button>
              </p>
              <p>fomat: {formData.fomat}</p>
              <p>time: {formData.time}</p>
              <p>template_name: {formData.template_name}</p>
              <p>name: {formData.name}</p>
              <p>scale-category: {formData["scale-category"]}</p>
              <p>date_updated: {formData.date_updated}</p>
            </>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dowell;
