/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Grid, Modal} from "antd-mobile";
import { Control } from 'react-keeper';
import { connect } from 'react-redux';
import {createTag, getRoomList} from '../../api/api';
import MySvg from '../layout/MySvg';

class Index extends React.Component {
    componentDidMount() {
        console.log(this.props.common.userInfo);
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.addRoom,
            this.props.common.menuConfig.type.managerRoom,
        ]);
        this.props.listenNavBarMenuSelect(this.listonNavBarMenuSelect);
        this.props.setPageTitle("我的家");
        this.props.getRoomList(0);
    };

	onClickRoom = (item, index) => {
        // 跳转到家具列表页面
        if (item.id !== 'add') {
            Control.go(`/furniture/${item.id}/0`);
            return true;
        }
        this.onAddRoom();
    };

    listonNavBarMenuSelect = node => {
        if (node.props.value === this.props.common.menuConfig.type.addRoom) {
            this.onAddRoom();
        }
        if (node.props.value === this.props.common.menuConfig.type.managerRoom) {
            console.log('管理房间');
        }
    };

    onAddRoom = () => {
        Control.go('/room/add');
    };

    render() {
        return <div>
            <p className="my-home-title">{this.props.common.userInfo.username}的小窝</p>
            <Grid data={this.props.home.roomList}
                  columnNum={3}
                  onClick={this.onClickRoom}
                  renderItem={dataItem => (
                      <div style={{ padding: '12.5px' }}>
                          <MySvg icon={dataItem.icon} style={{fontSize: '65px'}}/>
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                              <span>{dataItem.name}</span>
                          </div>
                      </div>
                  )}
            />
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getRoomList: homeId => dispatch(getRoomList(homeId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);