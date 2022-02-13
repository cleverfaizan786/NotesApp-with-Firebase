import React, { Component } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase Utility/firebase";

export default class Section extends Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.bodyRef = React.createRef();
  }
  // 😍 Successfully added note appending functionality to react website
  submitForm = (e) => {
    e.preventDefault();
  };

  addData = async () => {
    try {
      // eslint-disable-next-line
      await addDoc(collection(db, "notes"), {
        title: this.titleRef.current.value,
        description: this.bodyRef.current.value,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  render() {
    return (
      <div>
        <h1 className="font-bold text-3xl text-center mt-10 font-[amazon] text-blue-700">
          Welcome to NotesTaking App
        </h1>
        <div className="w-[40%] m-auto mt-10">
          <form onSubmit={this.submitForm}>
            <div className="flex flex-col gap-y-3">
              <label htmlFor="text" className="text-blue-700 font-bold text-xl">
                Add Title:
              </label>
              <input
                type="text"
                id="text"
                className="border-2 border-gray-300 rounded-md p-2 outline-none hover:shadow-lg  hover:ring-gray-200 hover:ring-2"
                ref={this.titleRef}
                required
              />
              <label
                htmlFor="content"
                className="text-blue-700 font-bold text-xl"
              >
                Add Note:
              </label>
              <textarea
                cols="90"
                rows="6"
                className="border-2 border-gray-300 rounded-md p-2 outline-none hover:shadow-lg hover:ring-gray-200 hover:ring-2"
                id="content"
                style={{ resize: "none" }}
                ref={this.bodyRef}
                required
              />
              <button
                onClick={this.addData}
                className="button w-1/6 disabled:bg-blue-100 disabled:text-gray-500"
                disabled={this.props.authState === "" ? true : false}
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
