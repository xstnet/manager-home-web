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
        default:
            return state;
    }
};

export default Category;