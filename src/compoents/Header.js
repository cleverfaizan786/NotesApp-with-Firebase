import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <>
        <nav className="fixed w-full bg-white h-[52px] top-0 flex text-blue-500 items-center justify-between shadow-xl">
       
          <div className="left-section flex items-center">
          <h1 className="ml-5 font-bold text-xl">NotesApp</h1>
            <ul className="flex w-1/2 ml-16">
              <li className="hover:text-blue-800 cursor-pointer transition">Home</li>
              <li className="listyle">About</li>
              <li className="listyle">Pricing</li>
            </ul>
          </div>

          <div className="right-section mr-9 space-x-6">
         <button className="button">Login</button>
         <button className="button">Signup</button>
          </div>
        </nav>
      </>
    );
  }
}
