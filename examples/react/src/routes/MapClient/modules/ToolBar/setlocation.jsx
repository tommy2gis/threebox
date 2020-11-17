/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:30:24 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-06-19 16:18:55
 */

import {
    zoomToPoint3D,highlightPoint
  } from "../../components/MapBoxGL/actions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Row, Col, InputNumber ,Input, Button,message } from 'antd';
var assign = require('object-assign');
const InputGroup = Input.Group;

export class SetLocation extends Component {
    static propTypes = {
        map: PropTypes.object,
    };

    state = {
        lng: null,
        lat: null,
    }
    componentDidMount() {

    }
    changeLng = e => {
        this.setState({
            lng: Number(e),
        })
    }

    changeLat = e => {
        this.setState({
            lat: Number(e),
        })
    }

    onClose=()=>{
        this.props.onClose();
        this.props.highlightPoint(null);
    }

    setView = ()=> {
        if(!this.state.lng){
            message.info('请输入经度');
        }else if(!this.state.lat){
            message.info('请输入维度');
        }else{
            this.props.zoomToPoint3D(
                { x: this.state.lng, y: this.state.lat},
                16
              );
            
            this.props.highlightPoint({ "type": "Feature",
            "geometry": {"type":"Point",
            "coordinates":[this.state.lng,this.state.lat]},
            "properties": {}
            })
        }
    }
    render() {
        return (
            <div className="viewtolocation">
                <InputGroup compact>
                    <InputNumber   placeholder="请输入经度" max={180} min={-180} onChange={this.changeLng} />
                    <InputNumber   placeholder="请输入维度" max={90} min={-90} onChange={this.changeLat} />
                    <Button type="primary" onClick={() => this.setView()}>定位</Button>
                    <Button onClick={this.onClose }>关闭</Button>
                </InputGroup>
            </div>
        )
    }
}

export default connect((state) => {
    return {}
}, { zoomToPoint3D,highlightPoint})(SetLocation);
