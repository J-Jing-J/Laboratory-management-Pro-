import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Popconfirm, Alert, Modal, Form, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {
  getRepairManage,
  addRepairList,
  changeRepairListState,
  deleteRepairListState,
  searchRepairListState,
} from '@/services/repairManage';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);

  let [data, setData] = useState([]);

  useEffect(async () => {
    const resData = await getRepairManage();
    setData(resData);
  }, []);

  // 打开添加表单的事件
  const showForm = () => {
    setIsModalVisible(true);
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
    actionRef.current.reload();
  };

  // 删除
  const confirmDelete = async (id) => {
    const res = await deleteRepairListState({ id });
    actionRef.current.reload();
  };

  const status = [
    <Alert message="待办" type="info" showIcon />,
    <Alert message="完成" type="success" showIcon />,
    <Alert message="拒绝" type="error" showIcon />,
  ];

  const columns = [
    {
      title: '房间',
      dataIndex: 'room',
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      hideInSearch: true,
    },
    {
      title: '设备编号',
      dataIndex: 'order_number',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return status[record.status];
      },
    },
    {
      title: '修改状态',
      hideInSearch: true,
      render: (_, record) => {
        let editOperation = [];
        if (record.status * 1 !== 0) {
          editOperation.push(
            <a onClick={() => changeState(record.id, 0)} key={0}>
              待办{' '}
            </a>,
          );
        }
        if (record.status * 1 !== 1) {
          editOperation.push(
            <a onClick={() => changeState(record.id, 1)} key={1}>
              完成{' '}
            </a>,
          );
        }
        if (record.status * 1 !== 2) {
          editOperation.push(
            <a onClick={() => changeState(record.id, 2)} key={2}>
              取消{' '}
            </a>,
          );
        }
        return editOperation;
      },
    },
    {
      title: '删除',
      render: (_, record) => {
        return (
          <Popconfirm
            okButtonProps={record.id}
            placement="top"
            title="永久删除不能恢复，是否确认删除"
            onConfirm={() => confirmDelete(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="danger" ghost>
              删除
            </Button>
          </Popconfirm>
        );
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
        request={async () => ({ data: await getRepairManage() })}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showForm}>
            <PlusOutlined /> 添加记录
          </Button>,
        ]}
      />

      <Modal title="添加维修记录" footer={null} visible={isModalVisible} onCancel={closeModal}>
        <ProForm
          onFinish={(value) => {
            handleForm(value);
          }}
        >
          <ProFormText name="room" label="房间" rules={[{ required: true }]} />
          <ProFormText name="type" label="设备类型" rules={[{ required: true }]} />
          <ProFormText name="order_number" label="设备编号" rules={[{ required: true }]} />
          <ProFormText name="description" label="问题描述" rules={[{ required: true }]} />
          <ProFormText
            name="status"
            label="状态"
            rules={[{ required: true }]}
            placeholder="0-待办 1-完成 2-拒绝"
          />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default RepairManage;
