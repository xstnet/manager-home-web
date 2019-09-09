/**
 * Created by shantong on 2018/4/29.
 */
import React from 'react';
import {Grid} from "antd-mobile";
import { Control } from 'react-keeper';
import MySvg from '../layout/MySvg';

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
        id: 'add',
        icon: 'icon-plus',
        title: '添加房间',
    },
];

class Index extends React.Component {
    componentDidMount() {
        this.props.setPageTitle('我的家');
    }

    onClick = (item, index) => {
        // 跳转到家具列表页面
        if (item.id !== 'add') {
            Control.go('/furniture/' + item.id);
            return true;
        }
        console.log('添加家具');
    }

    render() {
        return <div style={{minHeight: '80vh'}}>
            <p className="my-home-title">徐善通的家</p>
            <Grid data={homeGridList}
                  columnNum={3}
                  onClick={this.onClick}
                  renderItem={dataItem => (
                      <div style={{ padding: '12.5px' }}>
                          <MySvg icon={dataItem.icon} style={{fontSize: '65px'}}/>
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                              <span>{dataItem.title}</span>
                          </div>
                      </div>
                  )}
            />
        </div>
    }
}

export default Index;