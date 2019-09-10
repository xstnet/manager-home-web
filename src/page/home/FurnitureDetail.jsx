/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List} from 'antd-mobile';
import {Control} from 'react-keeper';
import './Furniture.css';

const Item = List.Item;
const Brief = Item.Brief;

class FurnitureDetail extends React.Component {
    state = {
        furnitureId: 0,
    };

    constructor(props) {
        super(props);
        let furnitureId = parseInt(this.props.params.furnitureId);
        this.state.furnitureId = furnitureId;
    }

    componentDidMount() {
        this.props.setPageTitle('家具信息');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addFurn,
            this.props.common.menuConfig.type.managerFurn,
        ]);
    }

    onClickFurniture = () => {
        console.log(this.state.furnitureId);
        Control.go('/furniture/' + this.state.furnitureId);
    };

    onClickArticle = () => {
        Control.go('/article');
    };

    render() {
        return <div>
            <List renderHeader={() => '黑色衣柜'} className="my-list">
                <Item arrow="horizontal" onClick={this.onClickFurniture}>{this.state.furnitureId}: 查看3个容器</Item>
                <Item arrow="horizontal" onClick={this.onClickArticle}>查看200件物品</Item>
            </List>
        </div>
    }
}

export default FurnitureDetail;