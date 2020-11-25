import React, { Component } from 'react'
import { Statistic, Row, Col,Carousel , Space } from "antd";
import BasePanel from '../BasePanel/basepanel';
import logopng from './title_logo.png';
import lcjpg1 from './lc1.jpg'
import lcjpg2 from './lc2.jpg'

export default class panels extends Component {
    render() {
        return (
            <div>
                 <Space direction="vertical" className="left_panel">
                   <BasePanel title="农业科技园" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                   <Carousel autoplay>
                    <div>
                   <img style={{width:400,height:250}} src={lcjpg1} />
                    </div>
                    <div>
                    <img style={{width:400,height:250}} src={lcjpg2}  />
                    </div>
                      </Carousel>
                    </BasePanel>
                    <BasePanel title="粮仓传感监测" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    <Row gutter={16}>
                        <Col span={12}>
                        <Statistic title="温度" value={20} prefix={<i className="iconfont icon-wendu" />} suffix="℃" />
                        </Col>
                        <Col span={12}>
                        <Statistic title="湿度" value={40} prefix={<i className="iconfont icon-shidu" />} suffix="%" />
                        </Col>
                    </Row>
                    </BasePanel>
                    <BasePanel title="视频监控" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel withborder">
                        
                    </BasePanel>
                 </Space>
                 <Space direction="vertical" className="right_panel">
                 <BasePanel title="园区车位数" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                    <BasePanel title="园区访问数" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                    </BasePanel>
                    <BasePanel title="楼栋信息" titleicon={<img style={{position:"fixed"}} src={logopng}></img>} className="areachange_panel">
                        
                    </BasePanel>
                </Space>
            </div>
        )
    }
}
