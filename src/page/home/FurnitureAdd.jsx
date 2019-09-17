/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {InputItem, List, Button, Tag, TextareaItem, Modal, Picker} from 'antd-mobile';
import { getRoomList } from '../../api/api';

import {connect} from "react-redux";
import './Furniture.css';

const Item = List.Item;
const Brief = Item.Brief;


class FurnitureAdd extends React.Component {
    state = {
        name: '',
		comment: '',
        roomId: [],
        furniture: {
            data: [],
            value: [],
            message: '无可用项',
            disabled: true,
            arrow: 'empty',
        },
        subFurniture: {
            data: [],
            value: [],
            message: '无可用项',
            disabled: true,
            arrow: 'empty',
        },
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setPageTitle('添加家具');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
        ]);

        if (this.props.home.roomList.length === 0) {
            this.props.getRoomList(0);
        }
    }


	onSubmit = () => {
		let params = {
			name: this.state.name,
			tagList: this.state.tagList.join(','),
			comment: this.state.comment,
		};
		console.log(params);
		this.props.createCategory(params);
	};

    onChangeRoom = (value) => {
        let roomId = value[0];
        let roomList = this.props.home.roomList;
        let room = roomList.find(item => (item.id === roomId));
        let furnitureList = room.furnitureList;

        console.log(value, this.props.home.roomList);

        this.setState({
            roomId: value,
            furniture: {
                data: furnitureList,
                value: [],
                disabled: furnitureList.length === 0,
                arrow: furnitureList.length === 0 ? 'empty' : 'horizontal',
                message: furnitureList.length === 0 ? '无可用项' : ''
            },
            subFurniture: {
                data: [],
                value: [],
                disabled: true,
                arrow: 'empty',
                message: '无可用项',
            },
        });
        console.log(this.state);
    };

    onChangeFurniture = value => {
        let lastOption;
        let current = this.props.home.roomList.find(item => (item.id === this.state.roomId[0])).furnitureList;
        console.log(current, 'current');
        for (let i = 0; i < value.length; i++) {
            lastOption = current.find((item) => (item.value === value[i]));
            if (lastOption === undefined)  {
                return false;
            }
            current = lastOption.children ? lastOption.children : [];
        }
        let subFurniture = {
            disabled: true,
            message: '无可用项',
            arrow: 'empty',
            data: [],
        };
        if (Array.isArray(lastOption.children) && lastOption.children.length > 0) {
            subFurniture = {
                disabled: false,
                message: '选择4-5级格子',
                arrow: 'horizontal',
                data: lastOption.children,
            };
        }
        subFurniture.value = [];
        this.setState({subFurniture, furniture: {...this.state.furniture, value}});
    };

    onChangeSubFurniture = value => {
        this.setState({
            subFurniture: {
                ...this.state.subFurniture,
                value,
            }
        });
    };

    render() {
        let roomList = this.props.home.roomList.map(item => {return {label:item.name,value:item.id}});
        return <div className="add-furniture-main">
            <List renderHeader={() => '添加家具或格子'}>
                <InputItem
                    className="add-furniture"
                    clear
                    placeholder="请输入家具名称"
                    value={this.state.name}
                    onChange={name => this.setState({ name })}
                    ref={el => this.labelFocusInst = el}
                ><div onClick={() => this.labelFocusInst.focus()}>名称</div></InputItem>

                <Picker data={roomList} title="选择房间" cols={1}
                        value={this.state.roomId}
                        onChange={this.onChangeRoom}
                >
                    <List.Item extra={this.state.subFurniture.message} arrow="horizontal">所属房间</List.Item>
                </Picker>

                {/*家具*/}
                <Picker data={this.state.furniture.data} title="所属家具" cols={3}
                        value={this.state.furniture.value}
                        onChange={this.onChangeFurniture}
                        disabled={this.state.furniture.disabled}
                        extra={this.state.furniture.message}
                >
                    <List.Item arrow={this.state.furniture.arrow} >所属家具</List.Item>
                </Picker>
                {/*容器*/}
                <Picker data={this.state.subFurniture.data} title="所属容器" cols={2}
                        value={this.state.subFurniture.value}
                        onChange={this.onChangeSubFurniture}
                        extra={this.state.subFurniture.message}
                        disabled={this.state.subFurniture.disabled}
                >
                    <List.Item arrow={this.state.subFurniture.arrow} >所属容器</List.Item>
                </Picker>
                {/*备注*/}
                <TextareaItem
                    title="描述"
                    placeholder="输入分类描述(可选)"
                    value={this.state.comment}
                    onChange={(comment) => {this.setState({comment})}}
                    autoHeight
                    labelNumber={4}
                />


            </List>

			<br />
			<br />

			<Button onClick={this.onSubmit} type="primary">提交</Button>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
	// category: state.Category,
    home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRoomList: homeId => dispatch(getRoomList(homeId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FurnitureAdd);