import React, { Component } from "react";
import { createPortal } from "react-dom";


// 出现在body下面，使用传送门方式

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }

  componentWillUnmount () {
    if (this.node) {
      window.document.body.removeChild(this.node);
    }
  }

  render () {
    return createPortal(
      <div className="dialog">
        <h3>Dialog</h3>
      </div>,
      this.node
    );
  }
}
