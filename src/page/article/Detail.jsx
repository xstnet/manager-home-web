/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {List, Tag} from "antd-mobile";
import {getArticleDetail} from '../../api/api';
import './Detail.css';
import MySvg from "../layout/MySvg";

const Item = List.Item;
const Brief = Item.Brief;


class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articleId: this.props.params.articleId,
            articleDetail: {

            },
        };
    }
    componentDidMount() {
        this.props.setPageTitle('物品信息');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.editArticle,
        ]);

        getArticleDetail().then(result => {
            console.log(result);
            this.setState({articleDetail: result.data});
        });
    };

    renderTitleAction = () => {
        return <div>
            <MySvg className="detail-header-action" icon="icon-edit"/>
            <MySvg className="detail-header-action" icon="icon-delete1"/>
        </div>
    };

    render() {
        return (<div>
            <List className="detail-header">
                <Item thumb={<img className="detail-logo" src="http://dummyimage.com/100x100/79f2e8" alt=""/>}
                      extra={this.renderTitleAction()}
                      multipleLine
                >
                    {this.state.articleDetail.name}
                    <Brief>
                        <div><b>数量: </b> {this.state.articleDetail.quantity}</div>
                        <div><b>分类: </b> {this.state.articleDetail.categoryName}</div>
                    </Brief>
                </Item>
            </List>
            <List renderHeader={() => ''} className="detail-info">
                <Item  wrap>
                    所在位置
                    <Brief>
                        {this.state.articleDetail.location}
                    </Brief>
                </Item>
                <Item className="detail-info-tag"  wrap>
                    标签
                    <Brief>
                        {this.state.articleDetail.tagList ? (this.state.articleDetail.tagList.map(item => {
                            return <Tag key={item.id} selected>{item.name}</Tag>
                        })) : ''}
                    </Brief>
                </Item>
            </List>
            <List className="detail-info" renderHeader={() => ''}>
                <Item>
                    <div>购买时间<div style={{float: "right"}}>{this.state.articleDetail.buyTime}</div></div>
                </Item>
                <Item>
                    <div>购买价格<div style={{float: "right"}}>{this.state.articleDetail.price} 元</div></div>
                </Item>
                <Item>
                    <div>属于<div style={{float: "right"}}>{this.state.articleDetail.ownUser}</div></div>
                </Item>
                <Item
                    multipleLine
                >
                    备注
                    <Brief className="article-comment-wrap" wrap>{this.state.articleDetail.comment}</Brief>
                </Item>
            </List>
            <List className="detail-image-list" renderHeader={() => '全部图片'}>
                <Item wrap>
                    <Brief>
                        {this.state.articleDetail.imageList ? (
                            this.state.articleDetail.imageList.map(item => {
                                return <img src={item} alt=""/>
                            })
                        ) : ''}

                    </Brief>
                </Item>
            </List>
        </div>);
    }
}

export default Detail;