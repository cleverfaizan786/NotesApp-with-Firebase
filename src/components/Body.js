import React, { Component } from "react";
import { auth } from "../Firebase Utility/firebase";
import { GoogleAuthProvider } from "@firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Section from "./Section.js";
import Note from "./Note";
import { db } from "../Firebase Utility/firebase";
import '../App.css'

const googleProvider = new GoogleAuthProvider();

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: "",
      username: "",
      noteData: [],
      // In this array, we are passing objects and appending them into this array!!😍
    };
  }
  fetchDataFromDb = () => {
    onSnapshot(collection(db, "notes"), (snapshot) => {
      this.setState({
        noteData: snapshot.docs.map((doc) => {
          return { id: doc.id, notes: doc.data() };
        }),
      });
    });
  };
  signInwithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((res) => {
        this.setState({
          photo: res.user.photoURL,
          username: res.user.displayName,
        });
      })
      .catch((er) => {
        console.log(er.message);
      });
    // Taking snapshot of database and appending it to noteData
    this.fetchDataFromDb();
  };
  componentDidMount() {
    // eslint-disable-next-line
    onAuthStateChanged(auth, async (user) => {
      if (user.displayName == null) {
        this.setState({
          photo: "",
          username: "",
        });
      } else {
        this.setState({
          photo: user.photoURL,
          username: user.displayName,
        });
      }
    });
    this.fetchDataFromDb();
  }

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
                <button type="button" class="button" onClick={this.signInwithGoogle}>
                  Sign in with Google
                </button>
                <button className="button">Signup</button>
              </>
            ) : (
              <div className="flex space-x-4 items-center">
                <div className="text-lg cursor-pointer">
                  Welcome {this.state.username}
                </div>
                <img
                  className="rounded-full h-10 cursor-pointer"
                  src={this.state.photo}
                  alt=""
                />
                <button
                  className="button"
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        this.setState({
                          photo: "",
                          username: "",
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Signout
                </button>
              </div>
            )}
          </div>
        </nav>
        <Section authState={this.state.username} />
        <div className="flex flex-wrap">
          {this.state.username !== ""
            ? this.state.noteData.map((elem) => {
                return <Note key={elem.id} noteContent={elem.notes} mainid={elem.id} />;
              })
            : null}
        </div>
      </>
    );
  }
}
