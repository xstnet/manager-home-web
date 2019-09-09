/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
// import { addTodo } from '@/api/Api.js'
import * as Actions from '../Actions';
import menuList from '../../../config/menuList';

const initState = {
    pageTitle: '我的家1',
    menuIcon: 'ellipsis',
    tabBarShow: true,
    menuList: menuList,
    userInfo: {
    },
};

const Common = (state = initState, action) => {
    switch (action.type) {
        case Actions.getMenus:
            return state.menuList;
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
        default:
            return state;
    }
};

export default Common;