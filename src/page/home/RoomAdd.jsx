/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {InputItem, List, Button, Tag, TextareaItem, Modal, Picker, Stepper, Grid, Toast} from 'antd-mobile';
import { createRoom } from '../../api/api';

import {connect} from "react-redux";
import './Furniture.css';
import MySvg from "../layout/MySvg";

const Item = List.Item;
const Brief = Item.Brief;

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

const fontIcon = [
    {fontIcon: 'icon-woshi'},
    {fontIcon: 'icon-keting'},
    {fontIcon: 'icon-chufang'},
    {fontIcon: 'icon-yangtai'},
    {fontIcon: 'icon-weishengjian'},
    {fontIcon: 'icon-home'},
    {fontIcon: 'icon-user'},
];


class RoomAdd extends React.Component {
    state = {
        name: '',
		comment: '',
        fontIcon: 'icon-home',
        chooseFontIconVisible: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setPageTitle('添加房间');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
        ]);
    }

    onCloseChooseFontIcon = () => {
        this.setState({chooseFontIconVisible: false});
    };

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    onClickFontIcon = (icon) => {
        this.setState({fontIcon: icon});
        this.onCloseChooseFontIcon();
    }

    // 提交
	onSubmit = () => {
        if (this.state.name.length <= 0) {
            Toast.info('请填写房间名称!', 2);
            return false;
        }
        let params = {
            name: this.state.name,
            comment: this.state.comment,
            fontIcon: this.state.fontIcon,
        };
        this.props.createRoom(params);
	};


    render() {
        return <div className="add-furniture-main">
            <List renderHeader={() => '添加房间'}>
                <InputItem
                    className="add-room-main"
                    clear
                    placeholder="请输入房间名称"
                    value={this.state.name}
                    onChange={name => this.setState({ name })}
                    ref={el => this.labelFocusInst = el}
                ><div onClick={() => this.labelFocusInst.focus()}>名称</div></InputItem>
                <List.Item
                    extra={
                        <svg className={`icon`} style={{fontSize: '22px'}}  aria-hidden="true">
                            <use xlinkHref={'#' + this.state.fontIcon}></use>
                        </svg>
                    }
                    arrow="horizontal"
                    onClick={(e) => {
                        e.preventDefault(); // 修复 Android 上点击穿透
                        this.setState({chooseFontIconVisible: true})}
                    }
                >
                    图标
                </List.Item>

                {/*备注*/}
                <TextareaItem
                    title="备注"
                    placeholder="输入备注"
                    value={this.state.comment}
                    onChange={(comment) => {this.setState({comment})}}
                    autoHeight
                    labelNumber={4}
                />


            </List>

			<br />
			<br />

			<Button onClick={this.onSubmit} type="primary">提交</Button>

            <Modal
                visible={this.state.chooseFontIconVisible}
                transparent
                maskClosable={false}
                onClose={this.onCloseChooseFontIcon}
                title="选择图标"
                footer={[{ text: '取消', onPress: this.onCloseChooseFontIcon }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <div style={{ height: 160, overflow: 'auto' }}>
                    <Grid data={fontIcon}
                          columnNum={5}
                          renderItem={dataItem => (
                              <div style={{ padding: '12.5px' }}
                                   onClick={this.onClickFontIcon.bind(this, dataItem.fontIcon)}
                              >
                                  <MySvg icon={dataItem.fontIcon} style={{fontSize: '22px'}}/>
                              </div>
                          )}
                    />
                </div>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
	// category: state.Category,
    home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    createRoom: params => dispatch(createRoom(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomAdd);