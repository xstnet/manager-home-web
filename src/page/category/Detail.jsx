/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List } from 'antd-mobile';
import {Control} from 'react-keeper';

const Item = List.Item;
const Brief = Item.Brief;


class Detail extends React.Component {
    state = {
        category: 0,
    };

    constructor(props) {
        super(props);
        let category = parseInt(this.props.params.category);
        this.state.furnitureId = category;
    }

    componentDidMount() {
        this.props.setPageTitle('类目信息');
    }

    onClickTagList = () => {
        Control.go('/category/taglist/' + this.state.category)
    };

    onClick = id => {
        Control.go('/category/detail/'+id);
    };

    render() {
        return <div>
            <List renderHeader={() => '上衣'} className="my-list">
                <Item arrow="horizontal" onClick={this.onClickArticle}>
                    查看物品
                    <Brief>查看该分类下的物品, 共200件</Brief>
                </Item>
                <Item arrow="horizontal" onClick={this.onClickTagList}>
                    查看标签
                    <Brief>管理标签, 共3个标签</Brief>
                </Item>
            </List>
        </div>
    }
}

export default Detail;