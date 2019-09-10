/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */

import * as Actions from '../Actions'


export const setPageTitle = title => ({
    type: Actions.setPageTitle,
    title
});

export const setTabBarIsShow = isShow => ({
    type: Actions.setTabBarIsShow,
    isShow
});

export const setMenuList = currentMenuList => ({
    type: Actions.setMenuList,
    currentMenuList
});

export const listenNavBarMenuSelect = callback => ({
    type: Actions.listenNavBarMenuSelect,
    callback
});

