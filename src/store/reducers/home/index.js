/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
// import { addTodo } from '@/api/Api.js'
import * as Actions from '../Actions'
import {menuItems, menuType} from "../../../config/menuList";

const initState = {
    roomList: [], // 包含:furnitureList
};

const Home = (state = initState, action) => {
    switch (action.type) {
        case Actions.setRoomList:
            return {
                ...state,
                roomList: action.roomList,
            };
        default:
            return state;
    }
};

export default Home;