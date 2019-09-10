/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List , Icon} from 'antd-mobile';
import {Control} from 'react-keeper';
import {connect} from 'react-redux';
import {getCategoryList} from '../../api/api';

const Item = List.Item;
const Brief = Item.Brief;

const categoryList = [
    {
        id: 0,
        name: '未分类',
        count: 200,
    },
    {
        id: 1,
        name: '上衣',
        count: 200,
    },
    {
        id: 2,
        name: '下衣',
        count: 200,
    },
    {
        id: 3,
        name: '饰品',
        count: 200,
    },
    {
        id: 4,
        name: '药品',
        count: 200,
    },
    {
        id: 5,
        name: '杂项',
        count: 200,
    },
];


class Index extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('类目列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addCategory,
            this.props.common.menuConfig.type.editCategory,
        ]);
        this.props.getCategoryList(0);
    }

    onClick = id => {
        Control.go('/category/detail/'+id);
    };

    render() {
        return <div>
            <List renderHeader={() => '物品类目'} className="my-list">
                {
                    this.props.category.categoryList.map((item, index) => {
                        return (
                            <Item arrow="horizontal" multipleLine
                                  key={index}
                                  onClick={this.onClick.bind(this, item.id)}
                            >
                                {item.name}
                                <Brief>包含{item.count}件物品 </Brief>
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