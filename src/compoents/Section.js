import React, { Component } from "react";

export default class Section extends Component {
  render() {
    return (
      <div>
        <h1 className="font-bold text-3xl text-center mt-10 font-[amazon]">
          Welcome to NotesTaking App
        </h1>
        <div className="flex flex-col w-1/2 m-auto gap-y-2 mt-10">
          <label htmlFor="text" className="text-blue-700 font-bold text-xl">Add Title:</label>
          <input type="text" id="text" className="border-2 border-gray-400 rounded-md p-2 outline-none"/>
          <label htmlFor="content" className="text-blue-700 font-bold text-xl">Add Note:</label>
          <textarea cols="90" rows="6" className="border-2 border-gray-400 rounded-md p-2 outline-none" id="content" style={{ resize:'none'}}/>
        </div>
      </div>
    );
  }
}
