/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 17:28
 */

import Mock from 'mockjs';
const Random = Mock.Random;

Mock.mock('/get-user-info', {
	code: 0,
	message: 'ok',
	data: {
		userInfo: {
			username: '@cname',
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
				'count|1-200': 20,
			},
			{
				id: 1,
				name: '上衣',
				'count|1-200': 20,
			},
			{
				id: 2,
				name: '下衣',
				'count|1-200': 20,
			},
			{
				id: 3,
				name: '饰品',
				'count|1-200': 20,
			},
			{
				id: 4,
				name: '药品',
				'count|1-200': 20,
			},
			{
				id: 5,
				name: '杂项',
				'count|1-200': 20,
			},
		],
	},
});


let articleList = {
	code: 0,
	message: 'ok',
	data: {
		'list|10': [
			{
				// name: '毛衣',
				'name|1': [
					'绿色毛衣1',
					'黑色裤子2',
					'黑色帽子3',
					'碎花裙子4',
					'白色羽绒服5',
				],
				comment: '这个是备注',
				location: '@province > @city',
				'logo|1': [
					Random.image('100x100', Random.hex()),
					Random.image('100x100', Random.hex()),
					Random.image('100x100', Random.hex()),
					Random.image('100x100', Random.hex()),
				],
			}
		],
		count: 53,
		'page|+1': 1,
		more: 1,
	},
};

Mock.mock(RegExp('/get-article-list' + ".*"), "get", (options) => {
	// 最佳实践，将请求和参数都打印出来，以便调试
	console.log('options', options);
	if (options.url.indexOf('page=5') !== -1) {
		articleList.data.more = 0;
		articleList.data['list|3'] = articleList.data['list|10'];
		articleList.data['list|3'][0]['name|1'] = ['这是最后一条了'];
		delete articleList.data['list|10'];
	}
	return Mock.mock(articleList);
});
