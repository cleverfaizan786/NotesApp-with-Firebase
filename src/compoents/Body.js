import React, { Component } from "react";
import { auth } from "../Firebase Utility/firebase";
import { GoogleAuthProvider } from "@firebase/auth";
import { signInWithPopup} from "firebase/auth";
import Section from "./Section";

const googleProvider = new GoogleAuthProvider();

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: "",
      username:""
    };
  }

  signInwithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res.user.displayName);
        console.log(res.user.photoURL);
        this.setState({
          photo: res.user.photoURL,
          username:res.user.displayName
        });
      })
      .catch((er) => {
        console.log(er.message);
      });
  };
  render() {
    return (
      <>
        <nav className="sticky w-full bg-white h-[52px] top-0 flex text-blue-500 items-center justify-between shadow-lg">
          <div className="left-section flex items-center">
            <h1 className="ml-5 font-bold text-xl ">NotesApp</h1>
            <ul className="flex w-1/2 ml-16 space-x-7">
              <li className="hover:text-blue-800 cursor-pointer transition  border-b-2 border-transparent hover:border-blue-600">
                Home
              </li>
              <li className="listyle">About</li>
              <li className="listyle">Pricing</li>
            </ul>
          </div>

          <div className="right-section mr-9 space-x-6">
            {this.state.photo === "" ? (
              <>
                <button onClick={this.signInwithGoogle} className="button">
                  Login
                </button>
                <button className="button">Signup</button>
              </>
            ) : (
              <div className="flex space-x-4 items-center">
                <div className="text-lg cursor-pointer">Welcome {this.state.username}</div>
                <img class="rounded-full h-10 cursor-pointer" src={this.state.photo} alt="" />
                <button className="button">Signout</button>
              </div>
            )}
          </div>
        </nav>
        <Section authState={this.state.username} />
      </>
    );
  }
}
