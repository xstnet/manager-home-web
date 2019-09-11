import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from 'antd-mobile';
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
            height: document.documentElement.clientHeight * 3 / 4,
            articleList: {
                list: [],
                page: 1,
                count: 0,
                more: 0,
            },
            dataSource: dataSource.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this.props.setPageTitle('物品列表');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.editArticle,
        ]);

        getArticleList(0).then(result => {
            console.log('result', result);
            this.setState({articleList: result.data});
        });


        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.articleList.list),
                isLoading: false,
                height: height,
            });
        }, 600);
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
        let articleList = this.state.articleList;
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !articleList.more) {
            return;
        }
        // console.log('reach end', event);
        this.setState({ isLoading: true });
        getArticleList(0, articleList.page + 1).then(result => {
            console.log('page result', result);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(result.data.list),
                articleList: result.data,
                isLoading: false,
            });
        });
    };

    renderRow = (rowData, sectionID, rowID) => {
        // console.log('rowData', rowData);
        return (
            <div key={rowID} style={{ padding: '0 15px' }}>

                <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                    <img className="article-logo" src={rowData.logo} alt="" />
                    <div style={{ lineHeight: 1 }}>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
                        <div className="article-list-item">
                            <p>位置: <span>{rowData.location}</span></p>
                            <p>备注: <span>{rowData.comment}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
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
            <ListView
                ref={el => this.lv = el}
                initialListSize={10}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>物品列表</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '正在加载...' : '加载完成'}
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
                onScroll={() => { console.log('scroll'); }}
                // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                scrollRenderAheadDistance={500}
                // 调用下一页的方法
                onEndReached={this.onEndReached}
                // 调用下一页的临界值, 单位px
                onEndReachedThreshold={10}
            />
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