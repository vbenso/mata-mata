import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import PlayerForm from "./PlayerForm";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <>
        <PlayerForm />
      </>
    );
  }
}

render(<App />, document.getElementById("root"));
