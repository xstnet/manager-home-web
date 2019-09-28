/**
 * Created by PhpStorm.
 * Author: Shantong Xu <shantongxu@qq.com>
 * Date: 2019/9/7
 * Time: 下午11:26
 */
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);