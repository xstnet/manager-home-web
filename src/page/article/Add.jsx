/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {
    List,
    InputItem,
    WhiteSpace,
    Checkbox,
    Stepper,
    Modal,
    TextareaItem,
    DatePicker,
    Picker,
    ImagePicker,
    Button,
    Tag,
    Toast,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import {getCategoryList} from '../../api/api';
import './Add.css';

const CheckboxItem = Checkbox.CheckboxItem;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const imageData = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const locationTree = [
    {
        label: '黑色衣柜',
        value: 1,
        children: [
            {
                label: '黑色衣柜2',
                value: 11,
            },
        ],
    },
    {
        label: '白色衣柜',
        value: 2,
        children: [
            {
                label: '黑色衣柜3',
                value: 21,
            },
            {
                label: '黑色衣柜44',
                value: 211,
                children: [
                    {
                        label: '黑色衣柜4',
                        value: 2111,
                        children: [
                            {
                                label: '黑色衣柜4',
                                value: 21111,
                                children: [
                                    {
                                        label: '黑色衣柜100',
                                        value: 211111,
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    },
];

class Add extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            buyDate: now,
            file: {
                files: imageData,
                multiple: true,
            },
            tagPicker: {
                visible: false,
                data: [],
                selectedData: [],
            },
            articleName: '',
            price: 0,
            comment: '',
            category: [],
            furniture: [],
            furnitureSub: [],

            // 家具格子
            furnitureGrid: {
                disabled: true,
                message: '请先选择家具',
                arrow: 'empty',
                data: [],
            },
            colorValue: ['#00FF00'],
            ownUser: [],
        };
    }

    componentDidMount() {
        this.props.setPageTitle('添加物品');
        this.props.setTabBarIsShow(false);
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.editArticle,
        ]);
        if (this.props.category.categoryList.length === 0) {
            this.props.getCategoryList();
        }

        this.setState({ownUser: [this.props.common.userInfo.id,]});


        setTimeout(() => {

        }, 1000);

        // this.autoFocusInst.focus();
    };

    componentWillReceiveProps(props) {
        this.setState({ownUser: [props.common.userInfo.id,]});
    }

    onQuantityChange = (quantity) => {
        // console.log(val);
        this.setState({ quantity });
    };

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            file: {
                files,
                multiple: this.state.file.multiple,
            }
        });
    };

    onChangeColor = (color) => {
        this.setState({
            colorValue: color,
        });
    };

    showTagPicker = (e) => {
        console.log(e, 'e');
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            tagPicker: {
                ...this.state.tagPicker,
                visible: true,
            }
        });
    };

    // 选择类目发生改变
    onChangeCategory = val => {
        if (val === this.state.category) {
            return false;
        }
        console.log(this.props.category.categoryList, val);
        let tagList = this.props.category.categoryList.find(item => (item.id === val[0])).tagList.map(item=>{return {label: item.name, value: item.id}});
        this.setState({
            tagPicker: {
                ...this.state.tagPicker,
                data: tagList,
                selectedData: [],
            },
            category: val,
        })

    };

    // 选择房间和家具 和第一个格子, 上层三级选择
    onChangeHomeFurniture = val => {
        console.log(val);
        if (val.length === 0) {
            return false;
        }
        let lastOption;
        let current = locationTree;
        for (let i = 0; i < val.length; i++) {
            lastOption = current.find((item) => (item.value === val[i]));
            if (lastOption === undefined)  {
                return false;
            }
            current = lastOption.children ? lastOption.children : [];
        }
        let furnitureGrid = {
            disabled: true,
            message: '没有可用的格子',
            arrow: 'empty',
            data: [],
        };
        if (Array.isArray(lastOption.children) && lastOption.children.length > 0) {
            furnitureGrid = {
                disabled: false,
                message: '请选择存储格子',
                arrow: 'horizontal',
                data: lastOption.children,

             };
        }
        this.setState({furnitureGrid, furniture: val});
    };

    onChangeTag = (value) => {
        let selectedData = this.state.tagPicker.selectedData;
        let checked = selectedData.findIndex(item => (item === value));
        if (checked !== -1) {
            delete selectedData[checked];
        } else {
            selectedData.push(value);
        }
        if (selectedData[0] === undefined) {
            selectedData = [];
        }
        this.setState({
            tagPicker: {
                ...this.state.tagPicker,
                selectedData: selectedData,
            }
        });
    };

    onCloseTagPicker = () => {
        this.setState({
            tagPicker: {
                ...this.state.tagPicker,
                visible: false,
            }
        });
    };

    onChangeOwnUser = (selected, id) => {

        let ownUser = this.state.ownUser;
        if (selected) {
            ownUser.push(id)
        } else {
            ownUser = ownUser.filter((item) => item !== id);
        }
        console.log(selected, id, ownUser);
        this.setState({ownUser});
    };

    onSubmit = (e) => {
        e.preventDefault();
        let params = {
            name: this.state.articleName,
            furniture: this.state.furniture,
            furnitureSub: this.state.furnitureSub,
            tags: this.state.tagPicker.selectedData,
            quantity: this.state.quantity,
            price: this.state.price,
            buyDate: this.state.buyDate,
            category: this.state.category,
            color: this.state.colorValue,
            comment: this.state.comment,
            ownUser: this.state.ownUser,
        };
        if (params.name.length <= 0) {
            Toast.info('请填写物品名称!', 2);
            return false;
        }
        if (params.furniture.length <= 1) {
            Toast.info('请选择存放位置!', 2);
            return false;
        }
        if (params.category.length <= 0) {
            Toast.info('请选择物品分类!', 2);
            return false;
        }

        console.log(params);
        Toast.success('添加成功!', 2);
    };

    render() {
        const { getFieldProps, getFieldDecorator } = this.props.form;
        const { files } = this.state.file;
        let category = this.props.category.categoryList.map(item => {return {label:item.name,value:item.id}});
        return (
            <div className="add-article-wrap">
                <List renderHeader={() => '添加物品'}>
                    <InputItem
                        className="add-article-name"
                        clear
                        placeholder="输入物品名称"
                       value={this.state.articleName}
                        onChange={articleName => this.setState({ articleName })}
                        ref={el => this.labelFocusInst = el}
                    ><div onClick={() => this.labelFocusInst.focus()}>物品名称</div></InputItem>

                    <List.Item
                        extra={
                            <Stepper
                                style={{ width: '100%', minWidth: '100px' }}
                                showNumber
                                max={9999}
                                min={1}
                                value={this.state.quantity}
                                onChange={this.onQuantityChange}
                            />}
                    >
                        数量
                    </List.Item>

                    <DatePicker
                        mode="date"
                        title="购买时间"
                        extra="Optional"
                        value={this.state.buyDate}
                        onChange={date => this.setState({ buyDate: date })}
                    >
                        <List.Item key="add-buy-time" arrow="horizontal">购买时间</List.Item>
                    </DatePicker>
                    <InputItem
                        type="money"
                        placeholder="购买价格"
                        clear
                        value={this.state.price}
                        onChange={(price) => {this.setState({price})}}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >价格</InputItem>


                    {/*颜色选择*/}
                    <Picker
                        data={this.props.common.userInfo.colorList.map((item, index) => {
                            return {
                                label: item === '' ? '无' : (<div key={`color-picker-item-${index}`}><span className="add-color-pick-item" style={{backgroundColor: item }}/></div>),
                                value: item,
                            };
                        })}
                        value={this.state.colorValue}
                        cols={1}
                        onChange={this.onChangeColor}
                    >
                        <List.Item key="add-color" arrow="horizontal">颜色</List.Item>
                    </Picker>
                    <List.Item className="add-own-user-wrap"  wrap>
                        拥有人
                        <List.Item.Brief>
                            {this.props.common.userInfo.familyMember.map(user => {
                                return <Tag key={user.id} onChange={(selected => {
                                    this.onChangeOwnUser(selected, user.id);
                                })} selected={this.state.ownUser.includes(user.id)}>{user.username}</Tag>
                            })}
                        </List.Item.Brief>
                    </List.Item>
                    {/*备注*/}
                    <TextareaItem
                        title="备注"
                        value={this.state.comment}
                        onChange={(comment) => {this.setState({comment})}}
                        autoHeight
                        labelNumber={4}
                    />
                </List>
                {/*分类*/}
                <List renderHeader={() => '分类'}>
                    <Picker data={category} title="选择类目" cols={1}
                            value={this.state.category}
                        onChange={this.onChangeCategory}
                    >
                        <List.Item arrow="horizontal">选择类目</List.Item>
                    </Picker>
                    <List.Item arrow="horizontal"
                    onClick={this.showTagPicker}
                    extra={`已选择${this.state.tagPicker.selectedData.length}项`}
                    >选择标签
                    </List.Item>
                </List>
                {/*存储位置*/}
                <List renderHeader={() => '存储位置'}>
                    <Picker title="存储家具" extra="存储家具"
                        cols={3}
                            value={this.state.furniture}
                        data={locationTree}
                        onChange={this.onChangeHomeFurniture}
                    >
                        <List.Item arrow="horizontal">存储家具</List.Item>

                    </Picker>
                    <Picker title="存储格子" extra={this.state.furnitureGrid.message}
                         cols={3}
                            value={this.state.furnitureSub}
                         data={this.state.furnitureGrid.data}
                            disabled={this.state.furnitureGrid.disabled}
                        onChange={(val) => {
                            this.setState({furnitureSub: val});
                        }}
                    >
                        <List.Item arrow={this.state.furnitureGrid.arrow}>存储格子</List.Item>
                    </Picker>
                </List>
                {/*图片*/}
                <List renderHeader={() => '图片'}>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple={this.state.file.multiple}
                    />
                </List>

                <br />
                <br />

                <Button onClick={this.onSubmit} type="primary">添加</Button>
                <br />
                <br />
                <br />

                <WhiteSpace />
                <Modal
                    popup
                    visible={this.state.tagPicker.visible}
                    onClose={this.onCloseTagPicker}
                    animationType="slide-up"
                >
                    <List className="tag-picker-wrap" renderHeader={() => '选择标签'}>
                        {this.state.tagPicker.data.map(item => (
                            <CheckboxItem key={item.value}
                                checked={this.state.tagPicker.selectedData.includes(item.value)}
                                onChange={() => this.onChangeTag(item.value)}
                            >
                                {item.label}
                            </CheckboxItem>
                        ))}
                    </List>
                    <div className="tag-picker-action">
                        {/*<div onClick={this.onCloseTagPicker} style={{float: 'left'}}>取消</div>*/}
                        <div onClick={this.onCloseTagPicker} style={{float: 'right'}}>完成</div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const AddForm = createForm()(Add);

const mapStateToProps = (state, ownProps) => ({
    category: state.Category,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCategoryList: () => dispatch(getCategoryList()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddForm);