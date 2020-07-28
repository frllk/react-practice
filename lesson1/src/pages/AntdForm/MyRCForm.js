import React, { Component } from "react";
import { createForm } from "rc-form";
import Input from "../../components/Input";

class MyRCForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }



  submit = () => {
    console.log("submit", this.state); //sy-log
  };

  render () {
    const { username, password } = this.state;
    return (
      <div>
        <h3>MyRCForm</h3>
        <Input placeholder="Username" value={username} onChange={e => this.setState({ username: e.target.value })} />
        <Input placeholder="Password" value={password} onChange={e => this.setState({ password: e.target.value })} />
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyRCForm;
