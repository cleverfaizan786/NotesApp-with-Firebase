import React, { Component } from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase Utility/firebase";
import "../App.css";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.newTitleRef = React.createRef();
    this.newBodyRef = React.createRef();
    this.modalRef = React.createRef();
    this.modalDisplay = React.createRef();
  }
  // Deleting notes
  deleteNotes = async () => {
    await deleteDoc(doc(db, "notes", this.props.mainid));
  };
  // Launching modal
  launch = () => {
    const { current } = this.modalRef;
    current.classList.add("modal-show");
    this.modalDisplay.current.style.transform = `translateY(30%)`;
  };
  // Editing notes
  updateNotes = async () => {
    const { current } = this.modalRef;
    current.classList.remove("modal-show");
    this.modalDisplay.current.style.transform = `translateY(-90%)`;
    await setDoc(
      doc(db, "notes", this.props.mainid),
      {
        title: this.newTitleRef.current.value,
        description: this.newBodyRef.current.value,
      },
      { merge: true }
    );
  };
  render() {
    return (
      <>
        <div className="modal-container" ref={this.modalRef}>
          <div className="modalDisplay" ref={this.modalDisplay}>
            <label
              htmlFor="newtext"
              className="text-blue-700 font-bold text-lg mt-10"
            >
              Add New Title:
            </label>
            <input
              ref={this.newTitleRef}
              type="text"
              id="newtext"
              className="border-2 border-gray-300 rounded-md p-1 outline-none hover:shadow-lg  hover:ring-gray-200 hover:ring-2 w-96"
            />
            <label
              className="text-blue-700 font-bold text-lg"
              htmlFor="newcontent"
            >
              Add New Note:
            </label>
            <textarea
              ref={this.newBodyRef}
              rows="4"
              cols="50"
              id="newcontent"
              className="border-2 border-gray-300 rounded-md  outline-none hover:shadow-lg p-1 hover:ring-gray-200 hover:ring-2"
            />
            <button className="button mb-8" onClick={this.updateNotes}>
              Ok
            </button>
          </div>
        </div>

        <div className="note-card shadow-xl w-1/5 h-auto my-12 ml-16 bg-white ring-1 ring-gray-400 rounded-sm break-words">
          <div className="title font-bold text-center py-2 text-xl">
            <span className="text-blue-600  ">Title:</span>{" "}
            {this.props.noteContent.title}
          </div>
          <hr />
          <div className="content p-5 text-lg">
            <span className="font-bold text-blue-600 mr-2">Your Note:</span>
            {this.props.noteContent.description}
          </div>
          <button onClick={this.launch} className="button my-5 mx-6">
            Edit
          </button>
          <button
            className=" bg-red-600 text-white rounded-md px-4 pb-2 pt-1 hover:bg-red-700 transition "
            onClick={this.deleteNotes}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
}
