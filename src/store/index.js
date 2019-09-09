/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:18
 */

import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

export default store;