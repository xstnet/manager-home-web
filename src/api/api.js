/**
 *
 * Created by PhpStorm.
 * Author: shantong Xu  <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 16:42
 */

import Http from '../utils/Http';
import Cache from '../utils/Cache';
import * as Actions from '../store/reducers/Actions';

// 登录
export const login = async (params) => {
	try {
		let result = await Http.post('/login', params, {message: '登录中。。。'});
		Cache.set('token', result.data.token);
		Cache.set('homeId', result.data.home_id);
		Cache.set('isLogin', 1);
		return result;
	} catch (err) {
		console.log(err);
	}
}

// 获取用户信息
export  function getUserInfo () {

	return async dispatch => {
		try {
			const result = await Http.get('/user/get-user-info');
			dispatch({
				type: Actions.setUserInfo,
				userInfo: result.data.userInfo,
			});
		} catch (err) {

		}
	};
}


// 登录
export const init = async () => {
	try {
		let userInfoRet = await Http.get('/user/get-user-info', {});
		let RoomListRet = await Http.get('/home/get-room-list', {});
		console.log('RoomListRet', RoomListRet);

		return {
			userInfo: userInfoRet.data,
			roomList: RoomListRet.data.roomList,
		};
	} catch (err) {
		console.log(err);
	}
}

// 获取家具列表
export function getFurnitureList(roomId, parentId = 0) {
	return Http.get('/get-furniture-list', {roomId, parentId});
}

// 获取类目列表
export function getCategoryList() {
	return dispatch => {
		Http.get('/category/get-category-list').then(res => {
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
	return Http.upload('/article/create-article', params);
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
		Http.post('/home/create-room', params).then(res => {
			dispatch({
				type: Actions.addRoom,
				room: res.data.room
			});
		});
	};
}