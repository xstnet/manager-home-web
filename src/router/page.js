import LoadComponents from "../utils/LoadComponents";

/**
 * Desc:
 * Created by PhpStorm.
 * User: shantong
 * Date: 2018/6/27
 * Time: 11:21
 */

export const Home = LoadComponents(() => import('../page/home/Index.jsx'));
export const Furniture = LoadComponents(() => import('../page/home/Furniture.jsx'));
export const FurnitureDetail = LoadComponents(() => import('../page/home/FurnitureDetail.jsx'));

export const Search = LoadComponents(() => import('../page/search/Index.jsx'));

export const Article = LoadComponents(() => import('../page/article/Index.jsx'));
export const Category = LoadComponents(() => import('../page/category/Index.jsx'));
export const CategoryDetail = LoadComponents(() => import('../page/category/Detail.jsx'));
export const TagList = LoadComponents(() => import('../page/category/TagList.jsx'));

export const UserCenter = LoadComponents(() => import('../page/userCenter/Index.jsx'));
