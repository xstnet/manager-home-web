/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Grid} from "antd-mobile";
import { Control } from 'react-keeper';
import { connect } from 'react-redux';
import MySvg from '../layout/MySvg';

const homeGridList = [
    {
        id: '1',
        icon: 'icon-woshi',
        title: '卧室',
    },
    {
        id: '1',
        icon: 'icon-keting',
        title: '客厅',
    },
    {
        id: '1',
        icon: 'icon-chufang',
        title: '厨房',
    },
    {
        id: '1',
        icon: 'icon-yangtai',
        title: '阳台',
    },
    {
        id: '1',
        icon: 'icon-weishengjian',
        title: '卫生间',
    },
    {
        id: 'add',
        icon: 'icon-plus',
        title: '添加房间',
    },
];

class Index extends React.Component {
    componentDidMount() {
        this.props.setPageTitle(`${this.props.common.userInfo.username}的小窝`);
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.addRoom,
            this.props.common.menuConfig.type.managerRoom,
        ]);
        this.props.listenNavBarMenuSelect(this.listonNavBarMenuSelect);
    };

    onClick = (item, index) => {
        // 跳转到家具列表页面
        if (item.id !== 'add') {
            Control.go('/furniture/' + item.id);
            return true;
        }
        console.log('添加家具');
    };

    listonNavBarMenuSelect = node => {
        if (node.props.value === this.props.common.menuConfig.type.addRoom) {
            console.log('添加房间');
            console.log(this.props.common);
        }
        if (node.props.value === this.props.common.menuConfig.type.managerRoom) {
            console.log('管理房间');
        }
    };

    render() {
        return <div>
            <p className="my-home-title">{this.props.common.userInfo.username}的小窝</p>
            <Grid data={homeGridList}
                  columnNum={3}
                  onClick={this.onClick}
                  renderItem={dataItem => (
                      <div style={{ padding: '12.5px' }}>
                          <MySvg icon={dataItem.icon} style={{fontSize: '65px'}}/>
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                              <span>{dataItem.title}</span>
                          </div>
                      </div>
                  )}
            />
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    // common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);