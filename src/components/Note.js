import React, { Component } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase Utility/firebase";


export default class Note extends Component {
    deleteNotes= async ()=>{
      await deleteDoc(doc(db, "notes", this.props.mainid));
    }
  render() {
    return (
      
  <div className="note-card shadow-xl w-1/5 h-auto my-12 ml-16 bg-white ring-1 ring-gray-400 rounded-sm break-words">
        <div className="title font-bold text-center py-2 text-xl">
        
          <span className="text-blue-600  ">Title:</span> {this.props.noteContent.title}
        </div>
        <hr />
        <div className="content p-5 text-lg">
          <span className="font-bold text-blue-600 mr-2">Your Note:</span>
          {this.props.noteContent.description}
        </div>
        <button className="button my-5 mx-6">Edit</button>
        <button className=" bg-red-600 text-white rounded-md px-4 pb-2 pt-1 hover:bg-red-700 transition " onClick={this.deleteNotes}>Delete</button>
      </div>
      
     
    );
  }
}
