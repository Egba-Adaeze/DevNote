import React, { useEffect, useState } from "react";
import book from "../assets/book.svg";
import line from "../assets/line.svg";
import plus from "../assets/plus.svg";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import AddNotes, { EditNotes } from "../components/AddNotes";
import Notes from "../components/Notes";
import logo from "../logo.svg";
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState([]); // Task State
  const [loading, setloading] = useState(true);
  const [modal, setModal] = useState(false);

  const [filteredNotes, setFilteredNotes] = useState([]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);

  // for search
  const handleSearch = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = filteredNotes?.filter((data) => {
        return (
          data.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          data.description?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setNotes(results);
    } else {
      setNotes(filteredNotes);
    }
  };

  const addNote = async (note) => {
    const newNotes = { ...note };
    try {
      await axios
        .post("http://localhost:8000/api/create-form", newNotes)
        .then((res) => {
          console.log(res.data);
          getForm();
          alert("You have successfully added a new note!");
          setModal(false);
        });
    } catch (err) {}
  };

  const getForm = () => {
    try {
      axios.get("http://localhost:8000/api/getForm").then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
      });
    } catch (err) {}
  };

  useEffect(getForm, []);

  const deleteNotes = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/delete-form/${id}`)
        .then(() => {
          console.log("Form deleted successfully");
          alert("You have successfully deleted a note!");
          getForm();
        });
    } catch (err) {
      alert(err);
    }
  };

  // Edit Task
  const editTask = (task) => {
    console.log("====================================");
    console.log(task);
    console.log("====================================");
    // openEditModal(notes.id)();
    // const title = prompt("Title");
    // const description = prompt("Description");
    const data = JSON.parse(localStorage.getItem("noteAdded"));
    const myData = data.map((item) => {
      if (item.id === task) {
        return {
          ...item,
          title: task.title,
          description: task.description,
          id: uuidv4(),
        };
      }

      return item;
    });
    // alert("You have successfully edited an existing note!");
    localStorage.setItem("noteAdded", JSON.stringify(myData));
    // window.location.reload();
  };

  const editNotes = (note) => {
    // console.log(notes, 'notess');
    // const data = JSON.parse(localStorage.getItem("noteAdded"));
    // const myData = data.map((item) => {
    //   if (item.id === note.id) {
    //     return {
    //       ...item,
    //       title: note.title,
    //       description: note.description,
    //       id: uuidv4(),
    //     };
    //   }

    // return item;
    // });
    // localStorage.setItem("noteAdded", JSON.stringify(myData));
    return note;
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center h-screen">
          <img src={logo} alt="logo" className="animate-spin w-20" />
        </div>
      ) : (
        <div className="w-full flex justify-center bg-[#E5E5E5]">
          <main className="flex flex-col h-screen relative w-[500px] bg-white overflow-auto">
            <div>
              <header>
                <span className="flex items-center gap-4 mt-8 pl-6">
                  <img src={book} alt="book" className="w-7 h-7" />
                  <p>Notes by Antonynans</p>
                </span>

                <img src={line} alt="" className="mb-2 mt-3 w-full" />
                <img src={line} alt="" className="w-full" />
              </header>

              <div className="px-6 mt-4">
                <input
                  className="border border-[#FA9F5E] rounded-full h-14 w-full px-6 outline-none"
                  placeholder="Search..."
                  onChange={(event) => handleSearch(event)}
                />
              </div>
            </div>
            {/* {console.log(notes)} */}
            <section className="px-6">
              {notes.length > 0 ? (
                <Notes notes={notes} onDelete={deleteNotes} getForm={getForm} />
              ) : (
                <p className="text-center">No items to display</p>
              )}
            </section>

            <footer className="flex justify-end pr-6 ">
              <button
                className="rounded-full bg-[#FB6900] text-white w-12 h-12 flex justify-center items-center fixed bottom-24"
                onClick={openModal}
              >
                <img src={plus} alt="" />
              </button>
            </footer>
          </main>

          <Modal
            style={{
              overlay: {
                position: "fixed",
                top: "0%",
                left: "0%",
                right: "0%",
                bottom: "0%",
                backgroundColor: "#00000078",
                zIndex: 100,
              },
            }}
            className="absolute top-[100px] mx-4 rounded-[5px] lg:top-auto mt-[30vh] left-0 lg:left-[35%] lg:right-[35%] right-0 h-auto pb-12 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 outline-none border-0 flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
            isOpen={modal}
            shouldCloseOnOverlayclick={true}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <AddNotes onSave={addNote} />
          </Modal>

          {/* <Modal
        style={{
          overlay: {
            position: "fixed",
            top: "0%",
            left: "0%",
            right: "0%",
            bottom: "0%",
            backgroundColor: "#00000078",
            zIndex: 100,
          },
        }}
        className="absolute top-[100px] mx-4 rounded-[5px] lg:top-auto mt-[30vh] left-0 lg:left-[35%] lg:right-[35%] right-0 h-auto pb-12 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 outline-none border-0 flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
        isOpen={editModal}
        shouldCloseOnOverlayclick={true}
        onRequestClose={closeEditModal}
        ariaHideApp={false}
      >
        <EditNotes onEdit={editTask} />
      </Modal> */}
        </div>
      )}
    </>
  );
}
