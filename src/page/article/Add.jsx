/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import { List, InputItem, WhiteSpace, Stepper, TextareaItem, DatePicker, Picker, ImagePicker, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';

const imageData = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const category = [
    {
        label: '上衣',
        value: 1,
    },
    {
        label: '下衣',
        value: 2,
    },
    {
        label: '鞋子',
        value: 3,
    },
];


class Add extends React.Component {
    state = {
        quantity: 1,
        buyDate: now,
        file: {
            files: imageData,
            multiple: true,
        }
    };

    componentDidMount() {
        this.props.setPageTitle('添加物品');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.editArticle,
        ]);
        // this.autoFocusInst.focus();
    };

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

    render() {
        const { getFieldProps } = this.props.form;
        const { files } = this.state.file;
        return (
            <div>
                <List renderHeader={() => '添加物品'}>
                    <InputItem
                        {...getFieldProps('inputclear')}
                        clear
                        placeholder="输入物品名称"
                        ref={el => this.labelFocusInst = el}
                    ><div onClick={() => this.labelFocusInst.focus()}>物品名称</div></InputItem>

                    <Picker data={category} title="选择家具" cols={1} {...getFieldProps('district3')} className="forss">
                        <List.Item arrow="horizontal">存放家具</List.Item>
                    </Picker>

                    <List.Item
                        wrap
                        extra={
                            <Stepper
                                style={{ width: '100%', minWidth: '100px' }}
                                showNumber
                                max={1000}
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
                        <List.Item arrow="horizontal">购买时间</List.Item>
                    </DatePicker>

                    <Picker data={category} title="选择类目" cols={1} {...getFieldProps('district3')} className="forss">
                        <List.Item arrow="horizontal">选择类目</List.Item>
                    </Picker>

                    <Picker data={category} title="选择标签" cols={1} {...getFieldProps('district3')} className="forss">
                        <List.Item arrow="horizontal">选择标签</List.Item>
                    </Picker>

                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple={this.state.file.multiple}
                    />

                    <TextareaItem
                        {...getFieldProps('note3')}
                        title="备注"
                        autoHeight
                        labelNumber={4}
                    />
                </List>

                <br />
                <br />
                <br />

                <Button type="primary">添加</Button>
                <br />

            </div>
        );
    }
}

const AddForm = createForm()(Add);

const mapStateToProps = (state, ownProps) => ({
    // common: state.Common,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddForm);