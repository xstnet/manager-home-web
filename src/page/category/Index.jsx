/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List, Icon, Button} from 'antd-mobile';
import {Control} from 'react-keeper';
import {connect} from 'react-redux';
import {getCategoryList} from '../../api/api';

const Item = List.Item;
const Brief = Item.Brief;

class Index extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('类目列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addCategory,
            this.props.common.menuConfig.type.editCategory,
        ]);
        this.props.getCategoryList(0);
        this.props.listenNavBarMenuSelect(this.listonNavBarMenuSelect);
    }

    listonNavBarMenuSelect = node => {
        if (node.props.value === this.props.common.menuConfig.type.addCategory) {
            Control.go('/category/add');
        }
        if (node.props.value === this.props.common.menuConfig.type.editCategory) {
            // console.log('管理房间');
        }
    };

    onShowTagClick = (categoryId, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        Control.go(`/category/taglist/${categoryId}`);
        console.log(categoryId);
    }

    onClick = id => {
        Control.go('/category/detail/'+id);
    };

    render() {
        return <div>
            <List renderHeader={() => '物品类目'} className="page-category-list">
                {
                    this.props.category.categoryList.map((item, index) => {
                        return (
                            <Item arrow="horizontal" multipleLine
                                  key={index}
                                  onClick={this.onClick.bind(this, item.id)}
                                  extra={<Button key={`button-category-${item.id}`} onClick={this.onShowTagClick.bind(this, item.id)} size="small" type="primary">查看标签</Button>}
                            >
                                {item.name}
                                <Brief>包含{item.articleCount}件物品, {item.tagCount}个标签 </Brief>
                            </Item>
                        );
                    })
                }
            </List>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    category: state.Category,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCategoryList: (id) => dispatch(getCategoryList(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);