/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List , Icon, Button} from 'antd-mobile';
import {Control} from 'react-keeper'
import {getFurnitureList, getRoomList} from '../../api/api';
import './Furniture.css';
import {connect} from "react-redux";

const Item = List.Item;
const Brief = Item.Brief;

class Furniture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: parseInt(this.props.params.roomId),
            furnitureId: parseInt(this.props.params.furnitureId),
            furnitureList: [],
        };
    }

    componentDidMount() {
        this.props.setPageTitle('家具列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.addFurn,
            this.props.common.menuConfig.type.managerFurn,
        ]);
        this.props.listenNavBarMenuSelect(this.listonNavBarMenuSelect);
        if (this.props.home.roomList.length === 0) {
            this.props.getRoomList(0);
        }

        console.log(this.props);
    }

    buildFurnitureData = () => {

    };

    listonNavBarMenuSelect = node => {
        if (node.props.value === this.props.common.menuConfig.type.addFurn) {
            Control.go('/furniture/add');
        }
    };

    onListItemClick = id => {
        Control.go('/article');
    };

    onShowContainerClick = (id, e) => {
        Control.go(`/furniture/${this.state.roomId}/${id}`);
        // window.location.href = `/furniture/${this.state.roomId}/${id}`;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    renderError = (error) => {
        return <div>
            {error}
        </div>
    };

    render() {
        console.log(3333);
        let furnitureList = [];

        let parentIds = '';

        if (this.props.home.roomList.length > 0) {
            let roomId = parseInt(this.props.params.roomId);
            let currentRoom = this.props.home.roomList.find(item => (item.id === roomId));
            console.log(currentRoom, 'currentRoom');
            if (currentRoom === undefined) {
                return this.renderError('暂无家具， 快来添加一个吧!');
            }
            furnitureList = currentRoom.furnitureList;
            let furnitureIds = this.props.params.furnitureIds;
            if (furnitureIds !== '0') {
                let furnitureIdArray = furnitureIds.split('-');
                for (let i = 0; i < furnitureIdArray.length; i++) {
                    let currentFurnId = parseInt(furnitureIdArray[i]);
                    furnitureList = furnitureList.find(item => currentFurnId === item.value);
                    if (furnitureList === undefined) {
                        return this.renderError('没有该家具!');
                    }
                    furnitureList = furnitureList.children ? furnitureList.children : [];
                    parentIds += `${currentFurnId}-`;
                }
            }
            if (furnitureList.length === 0) {
                return this.renderError('该家具下没有格子了!');
            }
        }


        return <div>
            <List className="furniture-list-action" renderHeader={() => '家具列表'}>
                {
                    furnitureList.map(item => {
                        if (item.value === '不选') {
                            return '';
                        }
                        return (
                            <Item key={`list-item-${item.value}`} arrow="horizontal" multipleLine
                                  style={{flexBasis: 'auto !important'}}
                                  onClick={this.onListItemClick.bind(this, item.value)}
                                  extra={<Button key={`button-${item.value}`} onClick={this.onShowContainerClick.bind(this, `${parentIds}${item.value}`)} size="small" type="primary">查看容器</Button>}
                            >
                                {item.label}
                                <Brief>包含{item.subFurnitureCount}个容器, {item.articleCount}件物品 </Brief>
                            </Item>
                        )
                    })
                }
            </List>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRoomList: homeId => dispatch(getRoomList(homeId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Furniture);