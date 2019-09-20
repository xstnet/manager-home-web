import LoadComponents from "../utils/LoadComponents";

/**
 * Desc:
 * Created by PhpStorm.
 * User: shantong
 * Date: 2018/6/27
 * Time: 11:21
 */

// 首页, 我的家
export const Home = LoadComponents(() => import('../page/home/Index.jsx'));
export const RoomAdd = LoadComponents(() => import('../page/home/RoomAdd.jsx'));
export const Furniture = LoadComponents(() => import('../page/home/Furniture.jsx'));
export const FurnitureDetail = LoadComponents(() => import('../page/home/FurnitureDetail.jsx'));
export const FurnitureAdd = LoadComponents(() => import('../page/home/FurnitureAdd.jsx'));

// 搜索页面
export const Search = LoadComponents(() => import('../page/search/Index.jsx'));

// 物品管理
export const Article = LoadComponents(() => import('../page/article/Index.jsx'));
export const ArticleAdd = LoadComponents(() => import('../page/article/Add.jsx'));
export const ArticleDetail = LoadComponents(() => import('../page/article/Detail.jsx'));

// 类目
export const Category = LoadComponents(() => import('../page/category/Index.jsx'));
export const CategoryAdd = LoadComponents(() => import('../page/category/Add.jsx'));
export const CategoryDetail = LoadComponents(() => import('../page/category/Detail.jsx'));
export const TagList = LoadComponents(() => import('../page/category/TagList.jsx'));

// 个人中心
export const UserCenter = LoadComponents(() => import('../page/userCenter/Index.jsx'));
