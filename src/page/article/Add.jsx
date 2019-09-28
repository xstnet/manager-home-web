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
import moment  from 'moment';
import { handleAddTag } from '../../store/reducers/category/action';
import {getCategoryList, createTag, createArticle, getRoomList} from '../../api/api';
import ImageUtil from '../../utils/ImageUtil';
import './Add.css';

const CheckboxItem = Checkbox.CheckboxItem;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Add extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            roomId: [],
            buyDate: now,
            file: {
                files: [],
                multiple: true,
            },
            progressImage: [],
            tagPicker: {
                visible: false,
                data: [],
                selectedData: [],
            },
            articleName: '',
            price: 0,
            comment: '',
            category: [],
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
            colorValue: ['#00FF00'],
            ownUser: [],
            addButton: {
                text: '添加',
                disabled: false,
                loading: false,
            },
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
        if (this.props.home.roomList.length === 0) {
            this.props.getRoomList(0);
        }

        this.setState({ownUser: [this.props.common.userInfo.id,]});
    };

    componentWillReceiveProps(props) {
        this.setState({ownUser: [props.common.userInfo.id,]});
    }

    onQuantityChange = (quantity) => {
        this.setState({ quantity });
    };

    onImageFileChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            file: {
                files,
                multiple: this.state.file.multiple,
            },
            progressImage: [],
        });
        console.log(this.state.file);
    };

    handleCompressImage = (fileList) => {
        console.log(fileList, 'fileList');
        for (let i = 0; i < fileList.length; i++) {
            ImageUtil.compressImage(fileList[i].file, fileList[i].url, i, (fileIndex, dataUrl, file) => {
                console.log(fileIndex, 'fileIndex');
                    let newFile = {};
                    newFile.file = ImageUtil.dataURLtoFile(dataUrl, file.name);
                    this.state.progressImage[fileIndex] = newFile;
                    this.setState(
                        {
                            progressImage: [...this.state.progressImage],
                        }, () => {
                            if (this.state.progressImage.length === fileList.length) {
                                if (!this.state.progressImage.includes(undefined)) {
                                    Toast.hide();
                                    this.onSubmit();
                                }
                            }
                        }
                    );
                }
            )
        }
        console.log(this.state.progressImage);
    }

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
        });

    };

    onChangeTag = (value) => {
        let selectedData = this.state.tagPicker.selectedData;
        console.log(value, selectedData);
        let checked = selectedData.findIndex(item => (item === value));
        if (checked !== -1) {
            selectedData.splice(checked, 1);
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

    genderImageFormData = () => {
        let formData = new FormData();
        console.log(this.state.progressImage);
        for (let i = 0; i < this.state.progressImage.length; i++) {
            let file = this.state.progressImage[i].file;
            formData.append('imageFile[]', file);
        }
        return formData;
    }

    onSubmit = (e) => {
        e && e.preventDefault();
        // if (this.state.articleName.length <= 0) {
        //     Toast.info('请填写物品名称!', 2);
        //     return false;
        // }
        // if (this.state.category.length <= 0) {
        //     Toast.info('请选择物品分类!', 2);
        //     return false;
        // }
        // if (this.state.roomId.length === 0) {
        //     Toast.info('请选择存放房间!', 2);
        //     return false;
        // }

        if (this.state.file.files.length !== this.state.progressImage.length) {
            Toast.loading('正在处理图片...', 0);
            this.handleCompressImage(this.state.file.files);
            return false;
        }

        let params = {
            name: this.state.articleName,
            roomId: this.state.roomId[0],
            furnitureIds: this.state.furniture.value.length === 0 ? 0 : [...this.state.furniture.value, ...this.state.subFurniture.value].join(','),
            tags: this.state.tagPicker.selectedData,
            quantity: this.state.quantity,
            price: this.state.price,
            buyDate: moment(this.state.buyDate).format("YYYY-MM-DD"),
            categoryId: this.state.category[0],
            color: this.state.colorValue.length === 0 ? '' : this.state.colorValue[0],
            comment: this.state.comment,
            ownUser: this.state.ownUser,
        };
        console.log('articleParams', params);
        let formData = this.genderImageFormData();
        for (let field in params) {
            formData.append(field, params[field]);
        }
        this.setState({addButton: {
                ...this.state.addButton,
                disabled: true,
                loading: true,
            }});

        // 添加物品
        createArticle(formData).then(result => {
            this.setState({addButton: {
                    ...this.state.addButton,
                    text: '继续添加',
                    disabled: false,
                    loading: false,
                }});
        }).catch(err => {
            this.setState({addButton: {
                    ...this.state.addButton,
                    disabled: false,
                    loading: false,
                }});
        });
    };

    onChangeRoom = (value) => {
        if (value === this.state.roomId) {
            return false;
        }
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
        if (value[value.length-1] === '不选') {
            value.splice(value.length - 1, 1);
        }
        if (value.length === 0) {
            return false;
        }
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
        if (Array.isArray(lastOption.children) && lastOption.children.length > 0 && value.length === 3) {
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
        if (value[value.length-1] === '不选') {
            value.splice(value.length - 1, 1);
        }
        if (value.length === 0) {
            return false;
        }
        this.setState({
            subFurniture: {
                ...this.state.subFurniture,
                value,
            }
        });
    };

    // 点击创建标签事件
    onCreateTag = () => {
        if (this.state.category.length === 0) {
            Toast.info('请先选择一个物品分类!', 2);
            return false;
        }

        let categoryName = this.props.category.categoryList.find(item => (item.id === this.state.category[0])).name;
        Modal.prompt('添加标签', `当前分类: ${categoryName}`, [
            { text: '取消' },
            { text: '添加', onPress: value => {
                    createTag(this.state.category[0], value).then(result => {
                        let newTag = {label: result.data.tagName, value: result.data.id, articleCount: 0};
                        this.setState({
                            tagPicker: {
                                ...this.state.tagPicker,
                                data: [...this.state.tagPicker.data, newTag],
                                selectedData: [...this.state.tagPicker.selectedData, newTag.value],
                            }
                        });
                        this.props.handleAddTag(newTag.value, newTag.label, result.data.categoryId);

                    });
                }
            },
        ], 'default');
    };

    render() {
        const { getFieldProps, getFieldDecorator } = this.props.form;
        let category = this.props.category.categoryList.map(item => {return {label:item.name,value:item.id}});
        let roomList = this.props.home.roomList.map(item => {return {label:item.name,value:item.id}});
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
                                })} selected={this.state.ownUser.includes(parseInt(user.id))}>{user.nickname}</Tag>
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
                    <Picker data={roomList} title="选择房间" cols={1} extra="选择房间"
                            value={this.state.roomId}
                            onChange={this.onChangeRoom}
                    >
                        <List.Item  arrow="horizontal">所属房间</List.Item>
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
                </List>
                {/*图片*/}
                <List renderHeader={() => '图片'}>
                    <ImagePicker
                        files={this.state.file.files}
                        onChange={this.onImageFileChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.file.files.length < 10}
                        multiple={this.state.file.multiple}
                    />
                </List>

                <br />
                <br />

                <Button
                    onClick={this.onSubmit}
                    loading={this.state.addButton.loading}
                    disabled={this.state.addButton.disabled}
                    type="primary"
                >
                    {this.state.addButton.text}
                </Button>
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
                        <div onClick={this.onCreateTag} style={{float: 'left'}}>创建标签</div>
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
    home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCategoryList: () => dispatch(getCategoryList()),
    getRoomList: homeId => dispatch(getRoomList(homeId)),
    handleAddTag: (id, tagName, categoryId) => dispatch(handleAddTag(id, tagName, categoryId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddForm);