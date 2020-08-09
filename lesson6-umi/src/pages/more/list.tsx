import React from 'react';
import styles from './list.less';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';
import { getProductData } from '../../services/product'

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

    getProductData = async (params) => {
      const { data } = await getProductData(params);
      console.log('res', data.data)
      return data
    }

    render() {
      return (
        <div>
          <h1 className={styles.title}>Page more/list</h1>
          <ProTable
            size="small"
            columns={columns}
            request={params => {
              return this.getProductData(params)
            }}
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