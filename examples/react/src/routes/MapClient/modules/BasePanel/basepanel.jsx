import React, { Component } from "react";
import "./style.less";
import { Card } from "antd";


export default class BasePanel extends Component {
  render() {
    return (
      <Card
        size="small"
        bordered={false}
        className={"basepanel "+this.props.className}
        title={<div>{[this.props.titleicon,<span style={{marginLeft:36}}>{this.props.title}</span>]}</div>}
     //   extra={<CloseOutlined onClick={this.props.onExtraClick} />}
        style={{ width: 400 }}
      >
        {this.props.children}
      </Card>
    );
  }
}
