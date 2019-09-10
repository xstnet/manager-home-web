import React from 'react';
import { Route, } from 'react-keeper';
import { connect, } from 'react-redux';
import * as Page from './page';
import {setPageTitle, setMenuList, listenNavBarMenuSelect} from '../store/reducers/common/action';

class Routers extends React.Component {
    render() {
        return (
            <div>
                <Route path="/>" {...this.props.commonAction} common={this.props.common} component={ Page.Home }></Route>
                <Route path="/furniture/:furnitureId>" {...this.props.commonAction} common={this.props.common}  component={ Page.Furniture }></Route>
                <Route path="/furniture/detail/:furnitureId>" {...this.props.commonAction} common={this.props.common}  component={ Page.FurnitureDetail }></Route>

                <Route path="/article>" {...this.props.commonAction} common={this.props.common}  component={ Page.Article }></Route>
                <Route path="/article/add>" {...this.props.commonAction} common={this.props.common}  component={ Page.ArticleAdd }></Route>

                <Route path="/search>" {...this.props.commonAction} common={this.props.common}  component={ Page.Search }></Route>

                <Route path="/category>" {...this.props.commonAction} common={this.props.common}  component={ Page.Category }></Route>
                <Route path="/category/detail/:categoryId>" {...this.props.commonAction} common={this.props.common}  component={ Page.CategoryDetail }></Route>
                <Route path="/category/taglist/:categoryId>" {...this.props.commonAction} common={this.props.common}  component={ Page.TagList }></Route>

                <Route path="/user-center>" {...this.props.commonAction} common={this.props.common}  component={ Page.UserCenter }></Route>

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
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routers)