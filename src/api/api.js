/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 16:42
 */

import Http from '../utils/Http';
import * as Actions from '../store/reducers/Actions';

export function getUserInfo() {
	return dispatch => {
		Http.get('/get-user-info').then(res => {
			dispatch({
				type: Actions.setUserInfo,
				userInfo: res.data.userInfo,
			});
		});
	};
};

export function getCategoryList(id) {
	return dispatch => {
		Http.get('/get-category-list').then(res => {
			dispatch({
				type: Actions.setCategoryList,
				categoryList: res.data.categoryList,
			});
		});
	};
};

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