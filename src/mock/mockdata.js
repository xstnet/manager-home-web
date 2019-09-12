/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 17:28
 */

import Mock from 'mockjs';
const Random = Mock.Random;

Mock.setup({
	timeout: '200-600' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

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
				'id|+1': 1,
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

// 物品列表
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

// 物品详情
Mock.mock(RegExp('/get-article-detail' + ".*"), "get", (options) => {
	let articleDetail = {
		code: 0,
		message: 'ok',
		data: {
			id: Random.natural( 1, 9999 ),
			'name|1': [
				'绿色毛衣1',
				'黑色裤子2',
				'黑色帽子3',
				'碎花裙子4',
				'白色羽绒服5',
			],
			'tagList|1-7': [
				{
					'id|+1': 1,
					'name|1': [
						'裤子', '裤子', '上衣', '冬季', '夏天', '毛衣', '家纺', '鞋子', '皮鞋', '电子产品', '数码'
					]
				},
			],
			'quantity|1-888': 1,
			'comment|1-7': '这是一个备注',
			categoryId: 1,
			'categoryName|1': [
				'上衣', '下衣', '电子产品', '帽子', '饰品', '箱包', '鞋子',
			],
			'location|1': [
				'客厅-电视柜-第三个格子',
				'卧室-大柜子-下层-第四格',
				'卧室-黑色行礼箱-外部夹层',
				'客厅-电视柜-第四个格子',
			],
			buyTime: '2019-09-12',
			'price|1-99999.2-2': 1,
			ownUser: '@cname',
			'logo|1': [
				Random.image('100x100', Random.hex()),
				Random.image('100x100', Random.hex()),
				Random.image('100x100', Random.hex()),
				Random.image('100x100', Random.hex()),
			],
			'imageList|1-3': [
				Random.image('100x100', Random.hex()),
				Random.image('100x100', Random.hex()),
			],
		},

	};
	return Mock.mock(articleDetail);
});

// 获取家具列表
Mock.mock(RegExp('/get-furniture-list' + ".*"), "get", (options) => {
	let list = {
		code: 0,
		message: 'ok',
		data: {
			'list|4-10': [
				{
					'id|+1': 1,
					'roomId|+1': 1,
					'parentId|+1': 1,
					'parents|1': [
						'1,2,3,4,5',
						'2,3,4,5',
						'5',
						'0',
					],
					'name|1': [
						'衣柜',
						'电视柜',
						'黑色柜子',
						'白色柜子',
						'行礼箱',
					],
					'subCount|0-10': 1,
					'articleCount|1-400': 1,
				},
			],
			total: 30,
			page: 1,
			more: 0,

		},

	};
	return Mock.mock(list);
});