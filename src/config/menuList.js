/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/9
 * Time: 下午9:41
 */

const MANAGER_FURN = 'MANAGER_FURN';
const ADD_ARTICLE = 'ADD_ARTICLE';
const EDIT_ARTICLE = 'EDIT_ARTICLE';
const ADD_ROOM = 'ADD_ROOM';
const MANAGER_ROOM = 'MANAGER_ROOM';
const ADD_CATEGORY = 'ADD_CATEGORY';
const EDIT_CATEGORY = 'EDIT_CATEGORY';
const ADD_TAG = 'ADD_TAG';
const MANAGER_TAG = 'MANAGER_TAG';

const menuType = {
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
};

export const menuList1 = {
    add_furn: {
        key: 'add-furn',
        name: '添加家具',
        icon: 'icon-plus',
    },
    MANAGER_FURN: {
        name: '管理家具',
        icon: 'icon-plus',
    },
    ADD_ARTICLE: {
        name: '添加物品',
        icon: 'icon-plus',
    },
    EDIT_ARTICLE: {
        name: '编辑物品',
        icon: 'icon-plus',
    },
    ADD_ROOM: {
        name: '添加房间',
        icon: 'icon-plus',
    },
    MANAGER_ROOM: {
        name: '管理房间',
        icon: 'icon-plus',
    },
    ADD_CATEGORY: {
        name: '添加类目',
        icon: 'icon-plus',
    },
    EDIT_CATEGORY: {
        name: '编辑类目',
        icon: 'icon-plus',
    },
    ADD_TAG: {
        name: '添加标签',
        icon: 'icon-plus',
    },
    MANAGER_TAG: {
        name: '管理标签',
        icon: 'icon-plus',
    },
};

export const menuList = [
    {
        key: 'add-furn',
        name: '添加家具',
        icon: 'icon-plus',
    },
    {
        name: '管理家具',
        icon: 'icon-plus',
    },
    {
        name: '添加物品',
        icon: 'icon-plus',
    },
    {
        name: '编辑物品',
        icon: 'icon-plus',
    },
    {
        name: '添加房间',
        icon: 'icon-plus',
    },
    {
        name: '管理房间',
        icon: 'icon-plus',
    },
    {
        name: '添加类目',
        icon: 'icon-plus',
    },
    {
        name: '编辑类目',
        icon: 'icon-plus',
    },
    {
        name: '添加标签',
        icon: 'icon-plus',
    },
    {
        name: '管理标签',
        icon: 'icon-plus',
    },
];

export default menuList;