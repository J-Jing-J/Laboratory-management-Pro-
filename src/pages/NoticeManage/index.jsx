import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fetchNotice, changePublishListState, addNotice } from '@/services/noticeManage';
import { PlusOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Switch, message, Tag } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import Create from '@/pages/NoticeManage/components/Create';
import Edit from '@/pages/NoticeManage/components/Edit';

const NoticeManage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [editId, seteditId] = useState(undefined);

  // ref便于刷新表格
  const actionRef = useRef();

  // 控制模态框显示和隐藏
  const isShowModal = (show) => {
    setModalVisible(show);
  };

  // 控制模态框显示和隐藏
  const isShowModalEdit = (show, id) => {
    setModalVisibleEdit(show);
    seteditId(id);
  };

  const changePublishStatus = async (record) => {
    const res = await changePublishListState(record);
    message.success('修改状态成功');
    actionRef.current.reload();
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <p style={{ fontSize: '17px', fontWeight: 600, color: '#6a89cc' }}>{record.title}</p>
      ),
    },
    {
      title: '发布者',
      dataIndex: 'publisher',
      hideInSearch: true,
      width: 100,
      align: 'center',
    },
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      hideInSearch: true,
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Tag icon={<ClockCircleOutlined />} color="success">
          {record.publish_time}
        </Tag>
      ),
    },
    {
      title: '发布状态',
      dataIndex: 'is_publish',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Switch
          checkedChildren="发布"
          unCheckedChildren="取消"
          defaultChecked={record.is_publish === true}
          onChange={() => changePublishStatus(record)}
        />
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '操作',
      hideInSearch: true,
      width: 100,
      align: 'center',
      render: (_, record) => <a onClick={() => isShowModalEdit(true, record.id)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params) => ({ data: await fetchNotice(params) })}
        rowKey="id"
        editable={{
          type: 'multiply',
        }}
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="公告列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => isShowModal(true)}
          >
            添加公告
          </Button>,
        ]}
      />
      <Create isModalVisible={isModalVisible} isShowModal={isShowModal} actionRef={actionRef} />
      {isModalVisibleEdit ? (
        <Edit
          isModalVisibleEdit={isModalVisibleEdit}
          isShowModalEdit={isShowModalEdit}
          actionRef={actionRef}
          editId={editId}
        />
      ) : (
        ''
      )}
    </PageContainer>
  );
};

export default NoticeManage;
