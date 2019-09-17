/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List , Icon, Button} from 'antd-mobile';
import {Control} from 'react-keeper'
import {getFurnitureList} from '../../api/api';
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
        getFurnitureList(this.state.roomId, this.state.furnitureId).then(result => {
            this.setState({furnitureList: result.data.list});
        });
    }

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

    componentDidUpdate() {
        let newFurnitureId = parseInt(this.props.params.furnitureId);
        if (this.state.furnitureId !== newFurnitureId) {
            getFurnitureList(this.state.roomId, this.state.furnitureId).then(result => {
                this.setState({furnitureList: result.data.list, furnitureId: newFurnitureId});
            });
        }
        console.log(this.state.furnitureId, this.props.params.furnitureId)
    }

    render() {
        return <div>
            <List className="furniture-list-action" renderHeader={() => '客厅里的家具'}>
                {
                    this.state.furnitureList.map(item => {
                        return (
                            <Item key={`list-item-${item.id}`} arrow="horizontal" multipleLine
                                  style={{flexBasis: 'auto !important'}}
                                  onClick={this.onListItemClick.bind(this, item.id)}
                                  extra={<Button key={`button-${item.id}`} onClick={this.onShowContainerClick.bind(this, item.id)} size="small" type="primary">查看容器</Button>}
                            >
                                {item.name}
                                <Brief>包含{item.subCount}个容器, {item.articleCount}件物品 </Brief>
                            </Item>
                        )
                    })
                }
            </List>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    // common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Furniture);