import React from 'react';
import './Main.css';

import {Popover, NavBar, Icon, TabBar} from 'antd-mobile';
import {Control} from 'react-keeper';
import { connect } from 'react-redux'

import Routers from "../../router";
import MySvg from "./MySvg";

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs"
                          alt=""/>;

const TabBarList = [
    {
        name: '我的家',
        icon: 'icon-home-copy',
        key: 'home',
        path: '/',
    },
    {
        name: '物品',
        icon: 'icon-wupinguanli',
        key: 'article',
        path: '/article',
    },
    {
        name: '类目',
        icon: 'icon-leimu',
        key: 'category',
        path: '/category',
    },
    {
        name: '个人中心',
        icon: 'icon-icon',
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
    onSelect = (opt, index) => {
        console.log(opt);
        console.log(index, 'index');
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    onTabBarSelect = (selectedTab, path) => {
        console.log(selectedTab, path);
        this.setState({
            selectedTab,
        });
        Control.go(path);
    };

    onBack = () => {
        console.log('onBack', Control.path);
        if (Control.path !== '/') {
            Control.go(-1);
        }
    };

    onSearch = () => {
        Control.go('/search');
    };

    componentDidMount = () => {
        console.log(this.props);
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
                             visible={this.state.visible}
                             overlay={[
                                 this.props.common.menuList.map((item, index) => {
                                     return (
                                         <Item key={index} value={index} icon={<MySvg icon={item.icon}/>}>{item.name}</Item>
                                     );
                                 }),
                             ]}
                             align={{
                                 overflow: {adjustY: 0, adjustX: 0},
                                 offset: [-10, 0],
                             }}
                             onVisibleChange={this.handleVisibleChange}
                             onSelect={this.onSelect}
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
            <Routers/>
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
    // toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)