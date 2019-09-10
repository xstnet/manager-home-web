/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List, Button, WhiteSpace} from 'antd-mobile';
// import {Control} from 'react-keeper';
import {connect} from 'react-redux';
// import {getUserInfo} from '../../api/api';
import './Index.css';

const Item = List.Item;

class Index extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('个人中心');
        this.props.setMenuList([
            this.props.common.menuConfig.type.setting,
            this.props.common.menuConfig.type.logout,
        ]);
    }
    render() {
        return <div>
            <div className="user-cover">
                <div className="user-cover-left">
                    <div className="user-cover-avatar">
                        <img src="https://www.xstnet.com/static/images/head.gif" alt=""/>
                    </div>
                </div>
                <div className="user-cover-right">
                    <div className="user-cover-name">-- {this.props.common.userInfo.username}</div>
                    <div className="user-cover-mobile">{this.props.common.userInfo.mobile}</div>
                </div>
                <span style={{clear: 'both'}}></span>
            </div>
            <List renderHeader={() => '我的信息'} className="my-list">
                <Item arrow="horizontal" onClick={()=>{}} >修改个人信息</Item>
                <Item arrow="horizontal" onClick={()=>{}} >修改密码</Item>
            </List>
            <List renderHeader={() => ''} className="my-list">
                <Item arrow="horizontal" onClick={()=>{}} >管理我的家</Item>
                <Item arrow="horizontal" onClick={()=>{}} >邀请家人</Item>
                <Item arrow="horizontal" onClick={()=>{}} >隐私管理</Item>
            </List>
            <Button className="logout-button" type="warning">退出登录</Button><WhiteSpace />
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    // common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // getUserInfo: () => dispatch(getUserInfo()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);