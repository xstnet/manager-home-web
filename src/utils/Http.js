/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 16:46
 */

import axios from 'axios';
import qs from 'qs';
import { Toast } from 'antd-mobile';
import { Control } from 'react-keeper';
import config from '../config/config';
import Cache from './Cache';

import '../mock/mockdata';



axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

axios.defaults.baseURL = config.BASE_URL;

axios.defaults.timeout = 5;

// 拦截请求
axios.interceptors.request.use(function (config) {
	if (config.url !== '/login') {
		let isLogin = parseInt(Cache.get('isLogin'));
		if (isLogin !== 1) {
			Toast.info('登录状态发生变化，请重新登录', 1.5);
			Control.go('/login');
			return false;
		}
	}
	// Toast.loading('加载中', 0);
	return config
});

// 拦截响应
axios.interceptors.response.use(function (config) {
	// Toast.hide();
	return config
});

class Http {
	static get(url, params = {}) {
		return new Promise((resolve, reject) => {
			params.homeId = Cache.get('homeId');
			axios.get(url, {
				params: params,
				headers: {
					Authorization: 'Bearer ' + Cache.getToken(),
				}
			}, ).then(res => {
				if (res.data.code === config.CODE_NO_PERMISSION) {
					Toast.info(res.data.message, 1.5);
					return Promise.reject('No Permission');
				} else if (res.data.code === config.CODE_NEED_LOGIN) {
					// Cache.remove('token');
					// Cache.remove('userInfo');
					// Cache.set('isLogin', false);
					Toast.info(res.data.message, 1.5);
					Control.go('/login');
					throw res.data.message;
				}
				resolve(res.data)
			}).catch(err => {
				reject(err);
			})
		})
	}

	static post(url, params = {}, tips = {}) {
		tips = {showMsg:true, loading: true, message: '提交中...', ...tips};
		if (tips.loading) {
			Toast.loading(tips.message, 0);
		}
		params.homeId = Cache.get('homeId');
		console.log('post params', params);
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(params), {
					headers: {
						Authorization: 'Bearer ' + Cache.getToken(),
					}
				}
			).then(res => {
				if (tips.loading) {
					Toast.hide();
				}
				if (res.data.code === config.CODE_NEED_LOGIN) {
					Cache.remove('token');
					Cache.set('isLogin', false);
					Toast.info(res.data.message, 1.5).then(Control.go('/login'));
					throw res.data.message;
				}
				switch (res.data.code) {
					case config.CODE_SUCCESS:
						if (tips.showMsg) {
							Toast.success(res.data.message);
						}
						break;
					default:
						return Promise.reject(res.data.message);
				}
				resolve(res.data);
			}).catch(err => {
				if (tips.loading) {
					Toast.hide();
					Toast.info(err);
				}
				reject(err);
			})
		})
	}
}

export default Http;