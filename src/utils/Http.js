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
// import Cache from './Cache';

import '../mock/mockdata';



axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.defaults.baseURL = config.BASE_URL;

// 拦截请求
axios.interceptors.request.use(function (config) {
/*	if (config.url !== 'login') {
		let isLogin = Cache.get('isLogin');
		console.log(isLogin, 'islogin')
		if (isLogin == 'false') {
			Toast.info('请先登录', 1.5);
			Control.go('/login');
			return false;
		}
	}*/
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
		// console.log(typeof Cache.get('token'));
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: params,
				headers: {
					// Authorization: 'Bearer ' + Cache.getToken(),
				}
			}, ).then(res => {
				if (res.data.code === config.CODE_NO_PERMISSION) {
					Toast.info(res.data.message, 1.5);
					return Promise.reject('No Permission')
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
				reject(err)
			})
		})
	}

	static post(url, params = {}, tips={showMsg:true}) {
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(params), {
					headers: {
						// Authorization: 'Bearer ' + Cache.getToken(),
					}
				}
			).then(res => {
				if (res.data.code === config.CODE_NEED_LOGIN) {
					// Cache.remove('token');
					// Cache.remove('userInfo');
					// Cache.set('isLogin', false);
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
						if (tips.showMsg) {
							Toast.info(res.data.message);
						}
						return Promise.reject('Action Error')
				}
				resolve(res.data)
			}).catch(err => {
				if (tips.loading) {
					Toast.hide();
				}
				reject(err)
			})
		})
	}
}

export default Http;