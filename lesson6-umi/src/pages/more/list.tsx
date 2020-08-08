import React from 'react';
import styles from './list.less';
import ProTable, { ProColumns } from '@ant-design/pro-table';

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

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page more/list</h1>
      <ProTable
        size="small"
        columns={columns}
        request={() => ({
          data: [
            {
              name: 'Jack',
              age: 12,
              date: '2020-01-02',
            },
          ],
          success: true,
        })}
        rowKey="name"
        pagination={{
          current: 1,
          pageSize: 10
        }}
      />
    </div>
  );
}
