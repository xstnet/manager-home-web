/**
 * Created by PhpStorm.
 * Author: Shantong Xu <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
import * as Actions from '../Actions';
import {menuType, menuItems} from '../../../config/menuList';

const initState = {
    pageTitle: '',
    menuIcon: 'ellipsis',
    tabBarShow: true,
    menuList: [],
    menuVisible: false,
    menuConfig: {
        type: menuType,
        menuItems: menuItems
    },
    onNavBarMenuSelect: item => {
        console.log(item);
    },
    beforeNavBarMenuSelect: item => {
        return true;
    },
    userInfo: {
        id: 0,
        mobile: '',
        username: '',
        homeList: [],
        familyMember: [],
        colorList: [],
    },
};

const Common = (state = initState, action) => {
    switch (action.type) {
        case Actions.setPageTitle:
            return {
                ...state,
                pageTitle: action.title,
            };
        case Actions.setTabBarIsShow:
            console.log(action.isShow, 2222);
            return {
                ...state,
                tabBarShow: action.isShow,
            };
        case Actions.setMenuList:
            action.currentMenuList.push(menuType.goHome);
            return {
                ...state,
                menuList: action.currentMenuList.map(type => {return state.menuConfig.menuItems[type]}),
            };
        case Actions.listenNavBarMenuSelect:
            return {
                ...state,
                onNavBarMenuSelect: function (item) {
                    console.log('aaa');
                    if (state.beforeNavBarMenuSelect(item)) {
                        action.callback(item);
                    }
                    return true;
                },
                menuVisible: false,
            };
        case Actions.beforeNavBarMenuSelect:
            return {
                ...state,
                beforeNavBarMenuSelect: action.callback,
            };
        case Actions.setUserInfo:
            return {
                ...state,
                userInfo: action.userInfo,
            };
        default:
            return state;
    }
};

export default Common;