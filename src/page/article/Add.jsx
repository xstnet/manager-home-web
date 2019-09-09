/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Grid} from "antd-mobile";

class Add extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('添加物品');
    }
    render() {
        return <div style={{minHeight: '80vh'}}>
            <p className="my-home-title">添加物品</p>

        </div>
    }
}

export default Add;