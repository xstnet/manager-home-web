/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */

import * as Actions from '../Actions';


export const handleAddTag = (id, tagName, categoryId) => ({
	type: Actions.addTag,
	id,
	tagName,
	categoryId: parseInt(categoryId),
});