import React from 'react';
import { Route, } from 'react-keeper';
import { connect, } from 'react-redux';
import * as Page from './page';
import {setPageTitle} from '../store/reducers/common/action';

class Routers extends React.Component {
    render() {
        return (
            <div>
                <Route path="/>" setPageTitle={this.props.setPageTitle} component={ Page.Home }></Route>
                <Route path="/furniture/:furnitureId>" setPageTitle={this.props.setPageTitle} component={ Page.Furniture }></Route>
                <Route path="/furniture/detail/:furnitureId>" setPageTitle={this.props.setPageTitle} component={ Page.FurnitureDetail }></Route>

                <Route path="/article>" setPageTitle={this.props.setPageTitle} component={ Page.Article }></Route>

                <Route path="/search>" setPageTitle={this.props.setPageTitle} component={ Page.Search }></Route>

                <Route path="/category>" setPageTitle={this.props.setPageTitle} component={ Page.Category }></Route>
                <Route path="/category/detail/:categoryId>" setPageTitle={this.props.setPageTitle} component={ Page.CategoryDetail }></Route>
                <Route path="/category/taglist/:categoryId>" setPageTitle={this.props.setPageTitle} component={ Page.TagList }></Route>

                <Route path="/user-center>" setPageTitle={this.props.setPageTitle} component={ Page.UserCenter }></Route>

                <Route miss setPageTitle={this.props.setPageTitle} component={ Page.Home }></Route>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setPageTitle: title => dispatch(setPageTitle(title)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routers)