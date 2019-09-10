import React from 'react';
import { SearchBar } from 'antd-mobile';
import {Control} from 'react-keeper';
import {connect} from 'react-redux';
import {setTabBarIsShow} from '../../store/reducers/common/action';

class Index extends React.Component {
    state = {
        value: '',
    };

    componentDidMount() {
        this.props.setTabBarIsShow(false);
        this.props.setPageTitle('搜索物品');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
        ]);
        this.autoFocusInst.focus();
    }

    onChange= (value) => {
        this.setState({ value });
    };

    onClear = () => {
        this.setState({ value: '' });
    };

    onCancel = () => {
        this.props.setTabBarIsShow(true);
        Control.go(-1);
    };

    render() {
        return (<div>
            <SearchBar
                value={this.state.value}
                placeholder="输入物品名称"
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={this.onClear}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={this.onCancel}
                showCancelButton
                onChange={this.onChange}
                ref={ref => this.autoFocusInst = ref}
            />
        </div>);
    }
}

const mapStateToProps = (state, ownProps) => ({
    // common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTabBarIsShow: isShow => dispatch(setTabBarIsShow(isShow)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)