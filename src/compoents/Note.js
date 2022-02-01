import React, { Component } from "react";

export default class Note extends Component {
  render() {
    return (
      
  <div className="note-card shadow-xl w-1/5 h-auto my-12 ml-16 bg-white ring-1 ring-gray-400 rounded-sm break-words">
        <div className="title font-bold text-center py-2 text-xl">
          {" "}
          <span className="text-blue-600  ">Title:</span> {this.props.title}
        </div>
        <hr />
        <div className="content p-5 text-lg">
          <span className="font-bold text-blue-600 mr-2">Your Note:</span>
          {this.props.content}
        </div>
        <button className="button my-5 mx-6">Edit</button>
      </div>
     
    );
  }
}
