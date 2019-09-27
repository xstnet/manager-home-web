/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List, Modal, Tag} from 'antd-mobile';
import {Control} from 'react-keeper';
import {createTag, getCategoryList} from "../../api/api";
import {connect} from "react-redux";
import {handleAddTag} from "../../store/reducers/category/action";

const Item = List.Item;
const Brief = Item.Brief;


class TagList extends React.Component {
    state = {
        categoryId: 0,
        listTip: '',
    };

    constructor(props) {
        super(props);
        this.state.categoryId = parseInt(this.props.params.categoryId);
    }

    componentDidMount() {
        this.props.setPageTitle('标签列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addTag,
            this.props.common.menuConfig.type.managerTag,
        ]);
        this.props.listenNavBarMenuSelect(this.listonNavBarMenuSelect);
        if (this.props.category.categoryList.length === 0) {
            this.props.getCategoryList();
        }
    }


    listonNavBarMenuSelect = node => {
        if (node.props.value === this.props.common.menuConfig.type.addTag) {
            this.onCreateTag();
        }
    };

    onCreateTag = () => {
        Modal.prompt('添加标签', '', [
            { text: '取消' },
            { text: '添加', onPress: value => {
                    createTag(this.state.categoryId, value).then(result => {
                        let newTag = {label: result.data.tagName, value: result.data.id, articleCount: 0};

                        this.props.handleAddTag(result.data.id, result.data.tagName, result.data.categoryId);
                    });
                }
            },
        ], 'default');
    }

    onClick = id => {
        Control.go('/category/detail/'+id);
    };

    render() {
        let tagList = this.props.category.categoryList.find(item => parseInt(item.id) === this.state.categoryId);
        tagList = tagList === undefined ? [] : tagList.tagList;

        return <div>
            <List renderHeader={() => '标签列表'} className="my-tag-list">
                {tagList.map(item => {
                    return <Item key={item.id} arrow="horizontal" onClick={this.onClickArticle}
                          extra={this.state.listTip}
                    >
                        {item.name} (<span style={{color: '#999'}}>{item.articleCount}</span>)
                    </Item>
                })}
            </List>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    category: state.Category,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCategoryList: (id) => dispatch(getCategoryList(id)),
    handleAddTag: (id, tagName, categoryId) => dispatch(handleAddTag(id, tagName, categoryId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList);