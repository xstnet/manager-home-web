/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List , Tag} from 'antd-mobile';
import {Control} from 'react-keeper'

const Item = List.Item;
const Brief = Item.Brief;


class Detail extends React.Component {
    state = {
        category: 0,
        listTip: '查看物品',
    };

    constructor(props) {
        super(props);
        let category = parseInt(this.props.params.category);
        this.state.furnitureId = category;
    }

    componentDidMount() {
        this.props.setPageTitle('标签列表');
    }

    onClick = id => {
        Control.go('/category/detail/'+id);
    };

    render() {
        return <div style={{minHeight: '60vh'}}>
            <List renderHeader={() => '标签列表'} className="my-list">
                <Item arrow="horizontal" onClick={this.onClickArticle}
                      extra={this.state.listTip}
                >
                    外套(200)
                </Item>
                <Item arrow="horizontal" onClick={()=>{}}
                      extra={this.state.listTip}
                >
                    裤子(45)
                </Item>
            </List>
        </div>
    }
}

export default Detail;