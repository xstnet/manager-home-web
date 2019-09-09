/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */

import * as Actions from '../Actions'

export const addTodo = (id, name) => ({
    type: Actions.addTodo,
    id,
    name
});

export const setPageTitle = title => ({
    type: Actions.setPageTitle,
    title
});

export const setTabBarIsShow = isShow => ({
    type: Actions.setTabBarIsShow,
    isShow
});

