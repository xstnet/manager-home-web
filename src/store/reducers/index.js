/**
 * Created by PhpStorm.
 * Author: Shantong Xu <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:18
 */

import { combineReducers } from 'redux';
import Home from './home/index';
import Common from './common/index';
import Category from './category/index';
import Article from './article/index';

export default combineReducers({
    Home,
    Common,
    Category,
    Article,
})