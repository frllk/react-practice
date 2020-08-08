import React from 'react';
import styles from './list.less';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

export default connect(
  ({ more }) => ({ more }),
  // mapDispatchToProps
  {
    getProductData: values => ({
      type: 'more/getProductData',
      payload: values,
    }),
  },
)(
  class List extends React.Component {
    constructor(props) {
      super(props)
    }
    actionRef = React.createRef()
    componentDidMount() {
      this.getProductData()
    }

    getProductData = async () => {
      const res = await this.props.getProductData({ name: '' });
      console.log('res', res)
    }

    render() {
      const { actionRef } = this.state
      const { data } = this.props.more
      const { getProductData } = this.props.getProductData
      return (
        <div>
          <h1 className={styles.title}>Page more/list</h1>
          <ProTable
            size="small"
            columns={columns}
            actionRef={actionRef}
            request={() => ({ data })}
            // request={() => ({
            //   data: [
            //     {
            //       name: 'Jack',
            //       age: 12,
            //       date: '2020-01-02',
            //     },
            //   ],
            //   success: true,
            // })}
            rowKey="name"
            pagination={{
              current: 1,
              pageSize: 10
            }}
          />
        </div>
      );
    }
  }
)