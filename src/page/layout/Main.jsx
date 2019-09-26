import React from 'react';
import './Main.css';

import {Popover, NavBar, Icon, TabBar, Toast} from 'antd-mobile';
import {Control} from 'react-keeper';
import { connect } from 'react-redux';
import Cache from '../../utils/Cache';
import {init} from '../../api/api';
import {setTabBarIsShow, beforeNavBarMenuSelect, setUserInfo} from '../../store/reducers/common/action';
import {setRoomList} from '../../store/reducers/home/action';

import Routers from "../../router";
import MySvg from "./MySvg";

const Item = Popover.Item;

const TabBarList = [
    {
        name: '我的家',
        icon: 'icon-home',
        key: 'home',
        path: '/',
    },
    {
        name: '类目',
        icon: 'icon-category',
        key: 'category',
        path: '/category',
    },
    {
        name: '物品',
        icon: 'icon-wupinguanli',
        key: 'article',
        path: '/article',
    },
    {
        name: '个人中心',
        icon: 'icon-user',
        key: 'user-center',
        path: '/user-center',
    },
];

class Main extends React.Component {
    state = {
        visible: false,
        selected: '',
        selectedTab: 'home',
    };

    onTabBarSelect = (selectedTab, path) => {
        let isLogin = parseInt(Cache.get('isLogin'));
        if (isLogin !== 1) {
            Toast.info('请先登录', 1.5);
            Control.go('/login');
            return;
        }
        this.setState({
            selectedTab,
        });
        Control.go(path);
    };

    onBack = () => {
        console.log('onBack', Control.path);
        if (Control.path !== '/') {
            if (Control.path === '/search' || Control.path === '/article/add') {
                this.props.setTabBarIsShow(true);
            }
            Control.go(-1);
        }
    };

    onSearch = () => {
        Control.go('/search');
    };

    onSelect = (node) => {
        this.setState({visible: false});
        this.props.common.onNavBarMenuSelect(node);
    };

    componentDidMount = () => {
        let isLogin = parseInt(Cache.get('isLogin'));
        if (isLogin !== 1) {
            Control.go('/login');
            return;
        }
        Toast.loading('加载中...', 0);
        init().then(result => {
            console.log(111, result);
            Toast.hide();
            this.props.setUserInfo(result.userInfo);
            this.props.setRoomList(result.roomList);
        });
        console.log('view userInfo', this.props.common.userInfo);





        this.props.beforeNavBarMenuSelect(this.beforeNavBarMenuSelect);

        let currentPath = Control.path;
        console.log(currentPath);
        if (currentPath === '/') {
            currentPath = '/home';
        }
        currentPath = currentPath.substr(1);
        this.setState({
            selectedTab: currentPath.split('/', 1)[0],
        })
    };

    /**
     * 右上角菜单选择事件 before
     */
    beforeNavBarMenuSelect = node => {
        let menuType = this.props.common.menuConfig.type;

        switch (node.props.value) {
            case menuType.addArticle:
                Control.go('/article/add');
                return false;
            case menuType.addFurn:
                Control.go('/furniture/add');
                return false;
            case menuType.goHome:
                Control.go('/');
                return false;
        }

        return  true;
    };

    renderTabBar = () => {
        return TabBarList.map(item => {
            return (
                <TabBar.Item
                    title={item.name}
                    key={`bottom-navbar-${item.key}`}
                    icon={<MySvg icon={item.icon} style={{fontSize: '22px'}}/>}
                    selectedIcon={<MySvg icon={item.icon} style={{fontSize: '22px'}}/>}
                    selected={this.state.selectedTab === item.key}
                    onPress={this.onTabBarSelect.bind(this, item.key, item.path)}
                >
                </TabBar.Item>
            );
        })
    };

    render() {
        return (<div>
            {/*顶部导航*/}
            <NavBar
                mode="dark"
                onLeftClick={this.onBack}
                icon={<Icon type="left" />}
                rightContent={[
                    <Icon onClick={this.onSearch} key="search" type="search" style={{marginRight: '16px'}}/>,
                    <Popover mask
                             key="navbar-menu"
                             overlayClassName="fortest"
                             overlayStyle={{color: 'currentColor'}}
                             // visible={this.props.common.menuVisible}
                             visible={this.state.visible}
                             overlay={[
                                 this.props.common.menuList.map((item, index) => {
                                     return (
                                         <Item key={index} value={item.key} icon={<MySvg icon={item.icon}/>}>{item.name}</Item>
                                     );
                                 }),
                             ]}
                             align={{
                                 overflow: {adjustY: 0, adjustX: 0},
                                 offset: [-10, 0],
                             }}
                             onSelect={this.onSelect}
                             // onSelect={this.props.common.onNavBarMenuSelect}
                    >
                        <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>
                ]}
            >
                {this.props.common.pageTitle}
            </NavBar>
            {/*内容*/}
            <div className="page-main" style={{overflow: "hidden", paddingBottom: `${this.props.common.tabBarShow ? 50 : 0}px`}}>
                <Routers/>
            </div>
            {/*底部导航*/}
            <div style={{ position: 'fixed', height: '50px', width: '100%', bottom: 0 }}>
                <TabBar
                    hidden={!this.props.common.tabBarShow}
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="bottom"
                >
                    {this.renderTabBar()}
                </TabBar>
            </div>
        </div>);
    }
}

const mapStateToProps = (state, ownProps) => ({
    common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTabBarIsShow: isShow => dispatch(setTabBarIsShow(isShow)),
    beforeNavBarMenuSelect: callback => dispatch(beforeNavBarMenuSelect(callback)),
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
    setRoomList: roomList => dispatch(setRoomList(roomList)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);