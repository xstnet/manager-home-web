import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Link } from 'react-keeper'

/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView, Button, Drawer, Toast } from 'antd-mobile';
import './Index.css';
import {getArticleList} from "../../api/api";

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 10;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
    console.log('sectionIDs', sectionIDs);
    console.log( 'rowIDs', rowIDs);
    console.log('dataBlobs', dataBlobs);
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            isLoading: true,
            loadMessage: '正在加载中...',
            height: document.documentElement.clientHeight * 3 / 4,
            article: {
                list: [],
                page: 1,
                count: 0,
                more: 0,
            },
            searchSidebarOpen: false,
            dataSource: dataSource.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this.props.setPageTitle('物品列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.editArticle,
        ]);
        const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop - 50;

        getArticleList(0).then(result => {
            console.log('result', result);
            if (result && result.code === 0) {
                this.setState({
                    article: result.data,
                    dataSource: this.state.dataSource.cloneWithRows(result.data.list),
                    isLoading: false,
                    height: height,
                    loadMessage: result.data.more === 1 ? this.state.loadMessage : '没有更多了',
                });
            } else {
                this.setState({
                    isLoading: false,
                    loadMessage: '加载失败， 请重试',
                });
            }
        });

    }

    onSidebarOpenChange = (...args) => {
        console.log(args);
        this.setState({ searchSidebarOpen: !this.state.searchSidebarOpen });
    }

    handleClickSelectButton = () => {
        this.setState({ searchSidebarOpen: true });
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    // 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足 onEndReachedThreshold 个像素的距离时调用
    onEndReached = (event) => {
        // return false;
        let article = this.state.article;
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !article.more) {
            this.setState({loadMessage: '没有更多了'});
            return;
        }
        // console.log('reach end', event);
        this.setState({ isLoading: true });
        getArticleList(0, article.page + 1).then(result => {
            console.log('page result', result);
            let allList = [...this.state.article.list, ...result.data.list];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(allList),
                article: {
                    ...result.data,
                    list: allList,
                },
                isLoading: false,
            });
        });
    };

    renderSearchSideBar = () => {
        return <div className="search-sidebar">
            222
        </div>
    }

    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        return (
            <Link to={`/article/detail/${rowData.id}`}>
            <div key={rowID} style={{ padding: '0 15px' }}>

                <div className="list-item-wrap">
                    <img className="list-item-logo" src={rowData.logo} alt="" />
                    <div className="lit-item-content-wrap">
                        <div className="list-item-name" style={{  }}>{rowData.name}</div>
                        <div className="list-item-content">
                            <p>位置: <span>{rowData.location}</span></p>
                            <p>备注: <span>{rowData.comment}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        );
    };

    renderHeader = () => {
        return <div style={{overflow: 'hidden'}}>
            <span>物品列表</span>
            <div style={{float: 'right'}}>
                <Button size="small" onClick={this.handleClickSelectButton} type="primary">筛选</Button>
            </div>
        </div>
    };

    render() {
        // 分隔符
        const separator = (sectionID, rowID) => (
            <div
                className="list-separator"
                key={`${sectionID}-${rowID}`}
            />
        );

        return (
            <div>
                {/*侧边筛选*/}
                <Drawer
                    className="my-drawer"
                    position="right"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    sidebar={this.renderSearchSideBar()}
                    open={this.state.searchSidebarOpen}
                    onOpenChange={this.onSidebarOpenChange}
                >
                    <ListView
                        ref={el => this.lv = el}
                        initialListSize={10}
                        dataSource={this.state.dataSource}
                        renderHeader={this.renderHeader}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.loadMessage}
                            {/*{this.state.isLoading ? '正在加载...' : '加载完成'}*/}
                        </div>)}
                        // 自定义 body 的包裹组件
                        renderBodyComponent={() => <MyBody />}
                        renderRow={this.renderRow}
                        /*
                         * 如果提供了此属性，一个可渲染的组件会被渲染在每一行下面，除了小节标题的前面的最后一行。
                         * 在其上方的小节ID和行ID，以及邻近的行是否被高亮会作为参数传递进来。
                         */
                        renderSeparator={separator}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        // 每次事件循环（每帧）渲染的行数
                        pageSize={10}
                        // onScroll={() => { console.log('scroll'); }}
                        // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                        scrollRenderAheadDistance={50}
                        // 调用下一页的方法
                        onEndReached={this.onEndReached}
                        // 调用下一页的临界值, 单位px
                        onEndReachedThreshold={10}
                    />

                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // article: state.Article,
});

// const mapDispatchToProps = (dispatch, ownProps) => ({
//
// });

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Index);