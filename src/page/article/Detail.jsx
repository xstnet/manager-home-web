/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Grid} from "antd-mobile";

const homeGridList = [
    {
        id: '1',
        icon: 'icon-woshi',
        title: '卧室',
    },
    {
        id: '1',
        icon: 'icon-keting',
        title: '客厅',
    },
    {
        id: '1',
        icon: 'icon-chufang',
        title: '厨房',
    },
    {
        id: '1',
        icon: 'icon-yangtai',
        title: '阳台',
    },
    {
        id: '1',
        icon: 'icon-weishengjian',
        title: '卫生间',
    },
    {
        id: '1',
        icon: 'icon-plus',
        title: '添加房间',
    },
];

class Detail extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('物品信息');
        this.props.setMenuList([
            this.props.common.menuConfig.type.addArticle,
            this.props.common.menuConfig.type.editArticle,
        ]);
    };
    render() {
        return <div>
            <p className="my-home-title">物品信息</p>
            <Grid data={homeGridList}
                  columnNum={3}
                  renderItem={dataItem => (
                      <div style={{ padding: '12.5px' }}>
                          <svg className="icon" style={{fontSize: '65px'}} aria-hidden="true">
                              <use xlinkHref={'#' + dataItem.icon}></use>
                          </svg>
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                              <span>{dataItem.title}</span>
                          </div>
                      </div>
                  )}
            />
        </div>
    }
}

export default Detail;