import React, { Component } from 'react'
import { Statistic, Row, Col, Space } from "antd";
import BasePanel from '../BasePanel/basepanel';
import logopng from './title_logo.png';

export default class panels extends Component {
    render() {
        return (
            <div>
                 <Space direction="vertical" className="left_panel">
                   <BasePanel title="农业科技园" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                    <BasePanel title="粮仓监测点" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                    <BasePanel title="监测点历史数据" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                 </Space>
                 <Space direction="vertical" className="right_panel">
                 <BasePanel title="园区车位数" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                    <BasePanel title="园区访问数" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                    <BasePanel title="监测点历史数据" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                </Space>
            </div>
        )
    }
}
