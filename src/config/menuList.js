/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/9
 * Time: 下午9:41
 */

export const menuType = {
    addFurn: 'ADD_FURN',
    managerFurn: 'MANAGER_FURN',
    addArticle: 'ADD_ARTICLE',
    editArticle: 'EDIT_ARTICLE',
    addRoom: 'ADD_ROOM',
    managerRoom: 'MANAGER_ROOM',
    addCategory: 'ADD_CATEGORY',
    editCategory: 'EDIT_CATEGORY',
    addTag: 'ADD_TAG',
    managerTag: 'MANAGER_TAG',
    logout: 'LOGOUT',
    setting: 'SETTING',
    goHome: 'GO_HOME',
};

export const menuItems = {
    [menuType.addFurn]: {
        key: menuType.addFurn,
        name: '添加家具',
        icon: 'icon-plus',
    },
    [menuType.managerFurn]: {
        key: menuType.managerFurn,
        name: '管理家具',
        icon: 'icon-plus',
    },
    [menuType.addArticle]: {
        key: menuType.addArticle,
        name: '添加物品',
        icon: 'icon-plus',
    },
    [menuType.editArticle]: {
        key: menuType.editArticle,
        name: '编辑物品',
        icon: 'icon-plus',
    },
    [menuType.addRoom]: {
        key: menuType.addRoom,
        name: '添加房间',
        icon: 'icon-plus',
    },
    [menuType.managerRoom]: {
        key: menuType.managerRoom,
        name: '管理房间',
        icon: 'icon-plus',
    },
    [menuType.addCategory]: {
        key: menuType.addCategory,
        name: '添加类目',
        icon: 'icon-plus',
    },
    [menuType.editCategory]: {
        key: menuType.editCategory,
        name: '编辑类目',
        icon: 'icon-plus',
    },
    [menuType.addTag]: {
        key: menuType.addTag,
        name: '添加标签',
        icon: 'icon-plus',
    },
    [menuType.managerTag]: {
        key: menuType.managerTag,
        name: '管理标签',
        icon: 'icon-plus',
    },
    [menuType.logout]: {
        key: menuType.logout,
        name: '退出登录',
        icon: '',
    },
    [menuType.setting]: {
        key: menuType.setting,
        name: '设置',
        icon: '',
    },
    [menuType.goHome]: {
        key: menuType.goHome,
        name: '返回首页',
        icon: 'icon-home',
    },
};
