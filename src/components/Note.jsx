import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import dots from "../assets/dots.svg";
import { EditNotes } from "./AddNotes";
import Modal from 'react-modal';
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


export default function Note({ note, onDelete, getForm }) {
  const [editModal, setEditModal] = useState(false);

  const editNotes = async (notes) => {
    const newNotes = { ...notes };
    try {
      await axios
        .patch(`http://localhost:8000/api/update-form/${note._id}`, newNotes)
        .then((res) => {
          console.log(res.data);
          getForm();
          alert("You have successfully updated a note!");
          closeEditModal();
        });
    } catch (err) {}
  };

  

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  return (
    <div className="border border-[#00000024] rounded-[5px] flex relative justify-between p-6 mt-8">
      <div className="w-full">
        <p className="text-lg capitalize mb-6">{note.title}</p>
        <p className="roboto text-[#000000BA] font-light "> {note.description.length > 140
                        ? `${note.description.substring(0, 140)}...`
                        : note.description}</p>
        <span className="flex items-center gap-2 pt-8">
          <button className="bg-[#FA9F5E] rounded-[25px] px-4 py-2 text-white">
            Created
          </button>
          <p>Wednesday, 1st January, 2020</p>
        </span>
      </div>

      <div>
        <Menu as="div" className=" flex items-center w-full">
          <Menu.Button>
            <img src={dots} alt="" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute border border-[#FA9F5E] right-0 top-10 py-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none mt-2 z-10">
              <div className="py-1 flex flex-col gap-2 w-32">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`flex items-center px-4 py-2 cursor-pointer font-raleway text-xs ${
                        active ? "bg-gray-100 text-gray-900" : "text-[#828282]"
                      }`}
                      onClick={() => onDelete(note._id)}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
                <hr className="bg-[#FA9F5E] py-[.5px]" />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`flex items-center px-4 py-2 cursor-pointer font-raleway text-xs ${
                        active ? "bg-gray-100 text-gray-900" : "text-[#828282]"
                      }`}
                      onClick={() => {
                        // onEdit(note.id);
                        openEditModal();
                      }}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

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
        isOpen={editModal}
        shouldCloseOnOverlayclick={true}
        onRequestClose={closeEditModal}
        ariaHideApp={false}
      >
        <EditNotes onEdit={editNotes} />
      </Modal>
    </div>
  );
}
