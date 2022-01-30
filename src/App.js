import React, { Component } from "react";
import Header from "./compoents/Header";
import Section from "./compoents/Section";
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Section />
      </div>
    );
  }
}
