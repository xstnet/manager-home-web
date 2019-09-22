/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Button, InputItem, List, TextareaItem} from "antd-mobile";
// import { Control } from 'react-keeper';
import { connect } from 'react-redux';
import {createTag} from '../../api/api';

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