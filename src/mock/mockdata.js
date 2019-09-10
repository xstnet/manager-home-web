/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 17:28
 */

import Mock from 'mockjs';

Mock.mock('/get-user-info', {
	code: 0,
	message: 'ok',
	data: {
		userInfo: {
			username: '娜娜',
			mobile: '13260718253',
		}
	},
});

Mock.mock('/get-category-list', {
	code: 0,
	message: 'ok',
	data: {
		categoryList: [
			{
				id: 0,
				name: '未分类1',
				count: 200,
			},
			{
				id: 1,
				name: '上衣',
				count: 200,
			},
			{
				id: 2,
				name: '下衣',
				count: 200,
			},
			{
				id: 3,
				name: '饰品',
				count: 200,
			},
			{
				id: 4,
				name: '药品',
				count: 200,
			},
			{
				id: 5,
				name: '杂项',
				count: 200,
			},
		],
	},
});