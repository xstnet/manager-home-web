/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List , Icon} from 'antd-mobile';
import {Control} from 'react-keeper'
import './Furniture.css';

const Item = List.Item;
const Brief = Item.Brief;

const FurnitureList = [
    {
        id: 1,
        name: '黑色衣柜',
        sublist: [
            {
                id: 11,
                name: '左二排',
                sublist: [
                    {id: 111, name: '上层',},
                    {id: 112, name: '下层',},
                ]
            },
            {
                id: 12,
                name: '右一排',
                sublist: [
                    {id: 111, name: '上层',},
                    {id: 112, name: '下层',},
                ]
            },
        ],
    },
    {
        id: 2,
        name: '白色衣柜',
        sublist: [
            {id: 21, name: '第一层',},
            {id: 22, name: '第二层',},
            {id: 23, name: '第三层',},
            {id: 24, name: '第四层',},
            {id: 25, name: '第五层',},
        ],
    },
    {
        id: 3,
        name: '白色零食架',
        sublist: [
            {id: 31, name: '第一层',},
            {id: 32, name: '第二层',},
            {id: 33, name: '第三层',},
            {id: 34, name: '第四层',},
            {id: 35, name: '第五层',},
        ],
    },
    {
        id: 3,
        name: '电视柜',
    },
    {
        id: 4,
        name: '电脑桌',
    },
    {
        id: 5,
        name: '暧脚箱',
    }
];

class Furniture extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('家具列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.addFurn,
            this.props.common.menuConfig.type.managerFurn,
        ]);
    }

    onClick = id => {
        Control.go('/furniture/detail/'+id);
    };

    render() {
        return <div>
            <List renderHeader={() => '客厅里的家具'} className="my-list">
                <Item arrow="horizontal" multipleLine
                      onClick={this.onClick.bind(this, 1)}
                >
                    黑色衣柜
                    <Brief>包含3个容器, 200件物品 </Brief>
                </Item>
                <Item arrow="horizontal" multipleLine
                      onClick={this.onClick.bind(this, 3)}
                >
                    白色衣柜
                    <Brief>包含3个容器, 200件物品 </Brief>
                </Item>
                <Item arrow="horizontal" multipleLine
                      onClick={this.onClick.bind(this, 2)}
                >
                    黑色衣柜
                    <Brief>包含3个容器, 200件物品 </Brief>
                </Item>
            </List>
        </div>
    }
}

export default Furniture;