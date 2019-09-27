/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
import * as Actions from '../Actions';
import {menuType, menuItems} from '../../../config/menuList';

const initState = {
    categoryList: [],
};

const Category = (state = initState, action) => {
    switch (action.type) {
        case Actions.setCategoryList:
            return {
                ...state,
                categoryList: action.categoryList,
            };
        case Actions.addCategory:
            return {
                ...state,
                categoryList: [...state.categoryList, action.category],
            };
        case Actions.addTag:
            let categoryList = state.categoryList;
            console.log(categoryList, action);
            let newTag = {
                id: action.id,
                name: action.tagName,
                articleCount: 0,
            };
            let categoryIndex = categoryList.findIndex((item) => (parseInt(item.id) === parseInt(action.categoryId)));
            categoryList[categoryIndex].tagList.unshift(newTag);
            return {
                ...state,
                categoryList: [...categoryList],
            };
        default:
            return state;
    }
};

export default Category;