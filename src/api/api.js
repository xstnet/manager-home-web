/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 16:42
 */

import Http from '../utils/Http';
import * as Actions from '../store/reducers/Actions';

export function getUserInfo1() {
	return dispatch => {
		Http.get('/get-user-info').then(res => {
			dispatch({
				type: Actions.setUserInfo,
				userInfo: res.data.userInfo,
			});
		});
	};
}

export const getUserInfo2 = async () => {

	return dispatch => {
		Http.get('/get-user-info').then(res => {
			dispatch({
				type: Actions.setUserInfo,
				userInfo: res.data.userInfo,
			});
		});
	};
};

// 获取用户信息
export  function getUserInfo () {

	return async dispatch => {
		try {
			const result = await Http.get('/get-user-info');
			console.log(result, '3333');
			dispatch({
				type: Actions.setUserInfo,
				userInfo: result.data.userInfo,
			});
		} catch (err) {

		}
	};
}

// 获取家具列表
export function getFurnitureList(roomId, parentId = 0) {
	return Http.get('/get-furniture-list', {roomId, parentId});
}

// 获取类目列表
export function getCategoryList() {
	return dispatch => {
		Http.get('/get-category-list').then(res => {
			dispatch({
				type: Actions.setCategoryList,
				categoryList: res.data.categoryList,
			});
		});
	};
}

// 获取物品详情
export function getArticleDetail(id = 0) {
	return Http.get('/get-article-detail', {id});
}

// 获取物品列表
export const getArticleList = (id, page = 1) => {

	return Http.get('/get-article-list', {id, page});
	// try {
	// 	return Http.get('/get-article-list', {id, page});
	// 	console.log(result);
	// 	return result;
	// } catch (err) {
	// 	console.log(err);
	// }
};

// 创建新标签
export function createTag(categoryId, tagName) {
	return Http.post('/category/create-tag', {categoryId, tagName});
}

// 添加物品
export function createArticle(params) {
	return Http.post('/article/create-article', params);
}

// 添加类目
export function createCategory(params) {
	return dispatch => {
		Http.post('/category/create-category', params).then(res => {
			dispatch({
				type: Actions.addCategory,
				category: res.data.category,
			});
		});
	};
}

// 添加家具
export function createFurniture(params) {
	return dispatch => {
		Http.post('/home/create-furniture', params).then(res => {
			dispatch({
				type: Actions.addFurniture,
				furniture: res.data.furniture,
			});
		});
	};
}

// 获取房间列表
export function getRoomList(homeId = 0) {
	return dispatch => {
		Http.get('/home/get-room-list', {homeId}).then(res => {
			dispatch({
				type: Actions.setRoomList,
				roomList: res.data.roomList,
			});
		});
	};
}

// 添加房间
export function createRoom(params) {
	return dispatch => {
		Http.post('/home/create-home', params).then(res => {
			dispatch({
				type: Actions.addRoom,
				room: res.data.room
			});
		});
	};
}