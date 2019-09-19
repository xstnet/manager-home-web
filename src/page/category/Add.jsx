/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {InputItem, List, Button, Tag, TextareaItem, Modal} from 'antd-mobile';
import {createFurniture} from "../../api/api";
import './Add.css';
import {connect} from "react-redux";

const Item = List.Item;
const Brief = Item.Brief;


class Add extends React.Component {
    state = {
        name: '',
        tagList: [],
		comment: '',
    };

    constructor(props) {
        super(props);
        this.state.furnitureId = parseInt(this.props.params.category);
    }

    componentDidMount() {
        this.props.setPageTitle('添加类目');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
        ]);
    }

    onAddTag = () => {
		Modal.prompt('添加标签', ``, [
			{ text: '取消' },
			{ text: '添加', onPress: value => {
					this.setState({tagList: [...this.state.tagList, value]});
				}
			},
		], 'default');
    };

	removeTag = index => {
		console.log(this.state.tagList);
		let tagList = this.state.tagList;
		tagList.splice(index, 1);
		this.setState({tagList: [...tagList]});
	};

	onSubmit = () => {
		let params = {
			name: this.state.name,
			tagList: this.state.tagList.join(','),
			comment: this.state.comment,
		};
		console.log(params);
		this.props.createCategory(params);
	};

    render() {
        return <div className="add-category">
            <List renderHeader={() => '添加类目'}>
                <InputItem
                    className="add-article-name"
                    clear
                    placeholder="输入分类名称"
                    value={this.state.name}
                    onChange={name => this.setState({ name })}
                    ref={el => this.labelFocusInst = el}
                ><div onClick={() => this.labelFocusInst.focus()}>名称</div></InputItem>

                <List.Item extra={
                    <Button size="small" type="ghost" onClick={this.onAddTag}>添加标签</Button>
                } wrap>
                    标签
                </List.Item>
                <List.Item className="add-tag" wrap>
                    <List.Item.Brief>
						{this.state.tagList.map((item, index) => {
							return <Tag key={index} selected closable={true} onClose={this.removeTag.bind(this, index)}>{item}</Tag>
						})}
                    </List.Item.Brief>
                </List.Item>
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
	category: state.Category,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	createFurniture: (params) => dispatch(createFurniture(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Add);