import React from 'react';
import { Route, } from 'react-keeper';
import { connect, } from 'react-redux';
import * as Page from './page';
import {setPageTitle, setMenuList, listenNavBarMenuSelect, setTabBarIsShow} from '../store/reducers/common/action';

class Routers extends React.Component {
    render() {
        return (
            <div>
                {/*首页,  我的家*/}
                <Route path="/>" {...this.props.commonAction} common={this.props.common} component={ Page.Home }></Route>
                <Route path="/room/add>" {...this.props.commonAction} common={this.props.common} component={ Page.RoomAdd }></Route>
                <Route path="/furniture-detail/:furnitureId>" {...this.props.commonAction} common={this.props.common}  component={ Page.FurnitureDetail }></Route>
                <Route path="/furniture/add>" {...this.props.commonAction} common={this.props.common}  component={ Page.FurnitureAdd }></Route>
                <Route path="/furniture/:roomId/:furnitureIds>" {...this.props.commonAction} common={this.props.common}  component={ Page.Furniture }></Route>

                {/*物品管理*/}
                <Route path="/article>" {...this.props.commonAction} common={this.props.common}  component={ Page.Article }></Route>
                <Route path="/article/add>" {...this.props.commonAction} common={this.props.common}  component={ Page.ArticleAdd }></Route>
                <Route path="/article/detail/:articleId>" {...this.props.commonAction} common={this.props.common}  component={ Page.ArticleDetail }></Route>

                {/*搜索页面*/}
                <Route path="/search>" {...this.props.commonAction} common={this.props.common}  component={ Page.Search }></Route>

                {/*类目*/}
                <Route path="/category>" {...this.props.commonAction} common={this.props.common}  component={ Page.Category }></Route>
                <Route path="/category/add>" {...this.props.commonAction} common={this.props.common}  component={ Page.CategoryAdd }></Route>
                <Route path="/category/detail/:categoryId>" {...this.props.commonAction} common={this.props.common}  component={ Page.CategoryDetail }></Route>
                <Route path="/category/taglist/:categoryId>" {...this.props.commonAction} common={this.props.common}  component={ Page.TagList }></Route>

                {/*个人中心*/}
                <Route path="/user-center>" {...this.props.commonAction} common={this.props.common}  component={ Page.UserCenter }></Route>

                {/*登录*/}
                <Route path="/login>" {...this.props.commonAction} component={ Page.Login }></Route>

                <Route miss {...this.props.commonAction} common={this.props.common} component={ Page.Home }></Route>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    commonAction: {
        setPageTitle: title => dispatch(setPageTitle(title)),
        setMenuList: currentMenuList => dispatch(setMenuList(currentMenuList)),
        listenNavBarMenuSelect: callback => dispatch(listenNavBarMenuSelect(callback)),
        setTabBarIsShow: isShow => dispatch(setTabBarIsShow(isShow)),
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routers)