/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List} from 'antd-mobile';
import {Control} from 'react-keeper';

const Item = List.Item;

class Index extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('个人中心');
    }
    render() {
        return <div>
            <List renderHeader={() => '个人中心'} className="my-list">
                <Item arrow="horizontal" onClick={()=>{}} >管理我的家</Item>
                <Item arrow="horizontal" onClick={()=>{}} >邀请家人</Item>
                <Item arrow="horizontal" onClick={()=>{}} >修改密码</Item>
                <Item arrow="horizontal" onClick={()=>{}} >隐私管理</Item>
            </List>
        </div>
    }
}

export default Index;