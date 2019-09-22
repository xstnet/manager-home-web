/**
 * Created by Administrator on 2018/7/7.
 */

const Cache = {
	get: (name) => {
		return localStorage.getItem(name);
	},
	set: (name, value, expires = 1) => {
		localStorage.setItem(name, value);
	},
	remove: (name) => {
		localStorage.removeItem(name);
	},
	getToken: () => {
		let token = localStorage.getItem('token');
		if (token == null || token == false || token.length < 10) {
			token = '';
		}
		return token;
	},

	getSession: (name) => {
		let data = sessionStorage.getItem(name);
		if (data) {
			return data;
		} else {
			return false;
		}
	},
	setSession: (name, value, expires = 1) => {
		sessionStorage.setItem(name, value);
	},
	removeSession: (name) => {
		sessionStorage.removeItem(name);
	},
}

export default Cache;