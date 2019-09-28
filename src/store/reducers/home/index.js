/**
 * Created by PhpStorm.
 * Author: Shantong Xu <shantongxu@qq.com>
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
        case Actions.addRoom:
            // let index = state.roomList.length;
            // index = index > 0 ? index - 1 : 0;
            // state.roomList.splice(index, 0, action.room);
            return {
                ...state,
                roomList: [...state.roomList, action.room],
            };
        case Actions.addFurniture:
            console.log(action);
            let roomList = state.roomList;
            let currentFurniture = roomList.find(item => (parseInt(item.id) === action.furniture.roomId)).furnitureList;
            console.log(currentFurniture);
            let furnitureItem = {
                value: action.furniture.id,
                label: action.furniture.name,
                articleCount: action.furniture.articleCount,
                subFurnitureCount: action.furniture.subFurnitureCount,
            };
            if (action.furniture.parentIds !== '0') {
                let parentIdArray = action.furniture.parentIds.split(',');
                console.log(parentIdArray);
                for (let i = 0; i < parentIdArray.length; i++) {
                    let parentId = parseInt(parentIdArray[i]);
                    if (parentId === action.furniture.id) {
                        break;
                    }
                    currentFurniture = currentFurniture.find(item => (item.value === parentId));
                    if (!currentFurniture.children) {
                        currentFurniture.children = [{label: '不选', value: '不选'}];
                    }
                    currentFurniture = currentFurniture.children;
                }
            }
            currentFurniture.push(furnitureItem);
            console.log(currentFurniture, roomList);
            return {
                ...state,
                roomList: [...roomList],
            };
        default:
            return state;
    }
};

export default Home;