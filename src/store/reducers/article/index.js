/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
import * as Actions from '../Actions';
import {menuType, menuItems} from '../../../config/menuList';

const initState = {
    articleList: {
        list: [],
        page: 1,
        count: 0,
        more: 0,
    },
};

const Article = (state = initState, action) => {
    switch (action.type) {
        case Actions.setArticleList:
            console.log('articleList', action.articleList);
            return {
                ...state,
                articleList: action.articleList,
            };
        default:
            return state;
    }
};

export default Article;