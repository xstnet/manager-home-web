/**
 *
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 17:28
 */

import Mock from 'mockjs';
const Random = Mock.Random;

const getPostParams = (body) => {
	let params = {};
	let t = body.split('&');
	for(let i = 0; i < t.length; i ++) {
		params[t[i].split("=")[0]]=(t[i].split("=")[1]);
	}

	return params;
};

Mock.setup({
	timeout: '200-600' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

// 获取用户信息
Mock.mock('/get-user-info', {
	code: 0,
	message: 'ok',
	data: {
		userInfo: {
			id: 1,
			username: '娜娜',
			mobile: '13260718253',
			homeList: [
				{
					id: 1,
					name: '娜娜的小窝',
					masterId: 1,
					default: 1,
				},
				{
					id: 2,
					name: '@cname 的小家',
					masterId: 2,
					default: 0,
				},
			],
			familyMember: [
				{
					id: 1,
					username: '娜娜',
				},
				{
					id: 3,
					username: '@cname',
				},
			],
			colorList: [
				'',
				'#1cdd49',
				'#dd1625',
				'#dd8327',
				'#ddcfc3',
				'#000',
				'#1f10dd',
			],
		}
	},
});

Mock.mock('/get-category-list', {
	code: 0,
	message: 'ok',
	data: {
		'categoryList|6': [
			{
				'id|+1': 10,
				'name|1': ['未分类', '上衣', '下衣', '鞋子', '饰品', '电子产品', '药品', '食物', '家纺'],
				'count|1-200': 20,
				'tagList|1-10': [
					{
						'id|+1': 500,
						'name|1': [
							'裤子', '饰品', '手镯', '鞋子', '帽子', '外套', '毛衣', '秋衣', '秋裤', '手表', '电脑', '手机', '感冒药', '药品'
						],
						'count|1-200': 1,
					}
				],
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
			'tagList|5-10': [
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

// 添加标签
Mock.mock(RegExp('/category/create-tag' + ".*"), "post", (options) => {
	let params = getPostParams(options.body);
	console.log(params);
	let result = {
		code: 0,
		message: '添加成功',
		data: {
			id: Random.natural( 1, 9999 ),
			tagName: params['tagName'],
			categoryId: params['categoryId'],
		},
	};

	return Mock.mock(result);
});

// 添加物品
Mock.mock(RegExp('/article/create-article' + ".*"), "post", (options) => {
	let params = getPostParams(options.body);
	console.log(params);
	let result = {
		code: 0,
		message: '添加成功',
		data: {},
	};

	return Mock.mock(result);
});

// 获取房间列表
Mock.mock(RegExp('/home/get-room-list' + ".*"), "get", (options) => {
	let result = {
		code: 0,
		message: 'ok',
		data: {
			roomList: [
				{
					id: 1,
					icon: 'icon-woshi',
					name: '卧室',
					furnitureList: [
						{
							label: '黑色格子',
							value: 1,
							articleCount: 0,
							subFurnitureCount: 0,
						},
						{
							label: '黑色格子2',
							value: 2,
							articleCount: 0,
							subFurnitureCount: 0,
						},
						{
							label: '黑色格子3',
							value: 3,
							articleCount: 0,
							subFurnitureCount: 0,
							children: [
								{
									label: '不选',
									value: '不选',
								},
								{
									label: '黑色格子3-1',
									value: 31,
									articleCount: 0,
									subFurnitureCount: 0,
									children: [
										{
											label: '不选',
											value: '不选',
										},
										{
											label: '黑色格子3-1-1',
											value: 311,
											articleCount: 0,
											subFurnitureCount: 0,
											children: [
												{
													label: '不选',
													value: '不选',
												},
												{
													label: '黑色格子3-1-1-1',
													value: 3111,
													articleCount: 0,
													subFurnitureCount: 0,
													children: [
														{
															label: '不选',
															value: '不选',
														},
														{
															label: '黑色格子3-1-1-1-1',
															value: 31111,
															articleCount: 0,
															subFurnitureCount: 0,
														},
														{
															label: '黑色格子3-1-1-1-2',
															value: 31112,
															articleCount: 0,
															subFurnitureCount: 0,
														},
													]
												}
											],
										},
									],
								},
							],
						},
					],
				},
				{
					id: 2,
					icon: 'icon-keting',
					name: '客厅',
					furnitureList: [],
				},
				{
					id: 3,
					icon: 'icon-chufang',
					name: '厨房',
					furnitureList: [],
				},
				{
					id: 4,
					icon: 'icon-yangtai',
					name: '阳台',
					furnitureList: [],
				},
				{
					id: 5,
					icon: 'icon-weishengjian',
					name: '卫生间',
					furnitureList: [],
				},
				{
					id: 'add',
					icon: 'icon-plus',
					name: '添加房间',
					furnitureList: [],
				},
			]
		},
	};

	return Mock.mock(result);
});

// 添加分类
Mock.mock(RegExp('/category/create-category' + ".*"), "post", (options) => {
	let params = getPostParams(options.body);
	console.log(params, options);

	let categoryId = Random.natural( 100, 9999 );
	let tagList = [];
	for (let i = 0; i < params.tagList.split('%2C').length; i++) {
		tagList.push({
			id: Random.natural( 100, 9999 ),
			categoryId,
			count: 0,
			name: params.tagList[i],
		});
	}
	let result = {
		code: 0,
		message: '添加成功',
		data: {
			category: {
				id: categoryId,
				name: params.name,
				count: 0,
				tagList,
			},
		},
	};

	return Mock.mock(result);
});


// 添加房间
Mock.mock(RegExp('/home/create-home' + ".*"), "post", (options) => {
	let params = getPostParams(options.body);
	console.log(params, options);

	let result = {
		code: 0,
		message: '添加成功',
		data: {
			room: {
				id: Random.natural( 100, 9999 ),
				name: params.name,
				icon: params.fontIcon,
				furnitureList: [],
			},
		},
	};
	console.log(result);

	return Mock.mock(result);
});

// 添加家具
Mock.mock(RegExp('/home/create-furniture' + ".*"), "post", (options) => {
	let params = getPostParams(options.body);
	console.log(params, options);

	let result = {
		code: 0,
		message: '添加成功',
		data: {
			furniture: {
				id: Random.natural( 100, 9999 ),
				roomId: parseInt(params.roomId),
				name: params.name,
				articleCount: 0,
				subFurnitureCount: 0,
				parentIds: params.parentIds.replace(/%2C/g, ','),
			},
		},
	};
	console.log(result);

	return Mock.mock(result);
});