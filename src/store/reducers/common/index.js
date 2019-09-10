/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
import * as Actions from '../Actions';
import {menuType, menuItems} from '../../../config/menuList';

const initState = {
    pageTitle: '我的家',
    menuIcon: 'ellipsis',
    tabBarShow: true,
    menuList: [],
    menuConfig: {
        type: menuType,
        menuItems: menuItems
    },
    onNavBarMenuSelect: item => {
        console.log(item);
    },
    userInfo: {
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
            return {
                ...state,
                menuList: action.currentMenuList.map(type => {return state.menuConfig.menuItems[type]}),
            };
        case Actions.listenNavBarMenuSelect:
            return {
                ...state,
                onNavBarMenuSelect: action.callback,
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