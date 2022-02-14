import React, { Component } from "react";
import { auth } from "../Firebase Utility/firebase";
import { GoogleAuthProvider } from "@firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Section from "./Section.js";
import Note from "./Note";
import { db } from "../Firebase Utility/firebase";
import "../App.css";

const googleProvider = new GoogleAuthProvider();

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.hamRef=React.createRef()
  

    this.state = {
      photo: "",
      username: "",
      noteData: [],
      // In this array, we are passing objects and appending them into this array!!😍
    };
  }
  fetchDataFromDb =  () => {
    onSnapshot(collection(db, "notes"), (snapshot) => {
      this.setState({
        noteData: snapshot.docs.map((doc) => {
          return { id: doc.id, notes: doc.data() };
        }),
      });
    });
  };
  signInwithGoogle = async () => {
     signInWithPopup(auth, googleProvider)
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

  openNav = () => {

  
   this.hamRef.current.classList.toggle("shadow-xl");
   this.hamRef.current.classList.toggle("avail");
  
   this.hamRef.current.classList.toggle("bg-white");
  }


  render() {
    return (
      <>
        <nav className="sticky top-0 flex flex-col bg-white h-10 shadow-md " >
          <div className="navigationSection flex items-center space-x-6 space-y-1">
            <div className="hamburger ml-4 mt-2 cursor-pointer" onClick={this.openNav}>
              <div className="bar1 bg-blue-900 w-6 h-1 mb-1"></div>
              <div className="bar2 bg-blue-900 w-6 h-1 mb-1"></div>
              <div className="bar3 bg-blue-900 w-6 h-1"></div>
            </div>
            <h1 className="font-bold text-blue-900  text-lg">
              NotesApp
            </h1>
          </div>

          <div className="left-section flex justify-center absolute top-8 w-full -z-10 "  ref={this.hamRef}>
            <ul className="flex flex-col items-center gap-3 ">
              <li className="p-2 hover:underline-offset-2 cursor-pointer">Home</li>
              <li className="p-2 hover:underline-offset-2 cursor-pointer">About</li>
              <li className="p-2 hover:underline-offset-2 pb-2 cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div className="right-section flex justify-end absolute right-0 top-1">
            {this.state.photo === "" ? (
              <>
                <button
                  className="button mr-2 "
                  onClick={this.signInwithGoogle}
                >
                  Google Login
                </button>
              </>
            ) : (
              <div className="flex">
                <div className="text-lg cursor-pointer mr-2 font-semibold">
                  Welcome
                </div>
                <img
                  className="rounded-full h-8 cursor-pointer mr-4"
                  src={this.state.photo}
                  alt=""
                />
                <button
                  className="button mr-2"
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
                return (
                  <Note
                    key={elem.id}
                    noteContent={elem.notes}
                    mainid={elem.id}
                  />
                );
              })
            : null}
        </div>
      </>
    );
  }
}
