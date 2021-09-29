import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Input, Alert, Modal, Form, Select, message, Tag } from 'antd';
import { PlusOutlined, AuditOutlined, UserOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import { getClassroomBorrowList } from '@/services/classroomBorrow';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);
  let [demand, setDemand] = useState('');

  let [classroomBorrowList, setClassroomBorrowList] = useState([]);

  useEffect(async () => {
    const resData = await getClassroomBorrowList();
    setClassroomBorrowList(resData);
  }, []);

  // 打开添加表单的事件
  const showForm = (demand) => {
    setIsModalVisible(true);
    setDemand(demand);
  };
  // 点击模态框关闭的事件
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // 表单验证通过后执行
  const handleForm = async (value) => {
    console.log(111, value);
    const res = await addRepairList(value);
    console.log(555555555, res);
    message.success('添加成功');
    setIsModalVisible(false);
    actionRef.current.reload();
    // 执行添加
    // const res = await addRepairList(value)
    // 刷新
    // props.dispatch({
    //   type: 'repairManage/getRepairTodolist',
    //   payload: null
    // })
  };

  // 修改状态
  const changeState = async (id, status) => {
    const res = await changeRepairListState({ id, status });
    console.log(res);
    actionRef.current.reload();
  };

  const result = [
    <Alert message="未处理" type="info" showIcon />,
    <Alert message="同意" type="success" showIcon />,
    <Alert message="拒绝" type="error" showIcon />,
  ];

  const columns = [
    {
      title: '借用房间',
      dataIndex: 'room',
    },
    {
      title: '借用人姓名',
      dataIndex: 'borrower',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Tag icon={<UserOutlined />} color="#2db7f5">
            {record.borrower}
          </Tag>
        );
      },
    },
    {
      title: '借用时间',
      dataIndex: 'borrow_time',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      hideInSearch: true,
    },
    {
      title: '响应结果',
      dataIndex: 'result',
      render: (_, record) => {
        return result[record.result];
      },
    },

    {
      title: '查看详情',
      hideInSearch: true,
      align: 'center',
      render: (_, record) => {
        return [
          <Button
            shape="round"
            icon={<AuditOutlined />}
            ghost
            type="primary"
            onClick={() => showForm(record.demand)}
          >
            查看详情{' '}
          </Button>,
        ];
      },
    },

    {
      title: '修改状态',
      hideInSearch: true,
      align: 'right',
      render: (_, record) => {
        let editOperation = [];
        if (record.result * 1 !== 0) {
          editOperation.push(
            <a
              style={{ color: '#6ab04c', fontWeight: '600', fontSize: '15px' }}
              onClick={() => changeState(record.id, 0)}
              key={0}
            >
              撤回{'  '}
            </a>,
          );
        }
        if (record.result * 1 !== 1) {
          editOperation.push(
            <a
              style={{ color: '#686de0', fontWeight: '600', fontSize: '15px' }}
              onClick={() => changeState(record.id, 1)}
              key={1}
            >
              同意{'  '}
            </a>,
          );
        }
        if (record.result * 1 !== 2) {
          editOperation.push(
            <a
              style={{ color: '#FD7272', fontWeight: '600', fontSize: '15px' }}
              onClick={() => changeState(record.id, 2)}
              key={2}
            >
              拒绝{'  '}
            </a>,
          );
        }
        return editOperation;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="待处理报修管理"
        // dataSource={data}
        request={async () => ({ data: await getClassroomBorrowList() })}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showForm}>
            <PlusOutlined /> 添加记录
          </Button>,
        ]}
      />

      <Modal title="申请详情" footer={null} visible={isModalVisible} onCancel={closeModal}>
        {demand}
      </Modal>
    </PageContainer>
  );
};

export default RepairManage;
