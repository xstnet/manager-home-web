/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Button, InputItem, List, TextareaItem, Toast} from "antd-mobile";
import { connect } from 'react-redux';
import {login} from '../../api/api';
import {Control} from "react-keeper";

class Index extends React.Component {
    state = {
        username: '',
        password: '',
    }
    componentDidMount() {
        this.props.setMenuList([]);
        this.props.setPageTitle("用户登录");
    };

    onSubmit = () => {
        if (this.state.username.length === 0) {
            Toast.info('请输入账号!', 2);
            return false;
        }
        if (this.state.password.length === 0) {
            Toast.info('请输入密码!', 2);
            return false;
        }
        login({username: this.state.username, password: this.state.password}).then(res => {
            console.log('登录返回结果', res);
            if (res !== undefined && res.code === 0) {
                Control.go('/');
            }
        });
    };

    render() {
        return <div>
            <List renderHeader={() => '登录后可管理家'}>
                <InputItem
                    type="text"
                    placeholder="账号"
                    value={this.state.username}
                    onChange={(username) => {this.setState({username})}}
                >账号</InputItem>
                <InputItem
                    type="password"
                    placeholder="密码"
                    value={this.state.password}
                    onChange={(password) => {this.setState({password})}}
                >密码</InputItem>
            </List>
            <br/>
            <br/>
            <Button onClick={this.onSubmit} type="primary">登录</Button>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    // home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // getRoomList: homeId => dispatch(getRoomList(homeId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);