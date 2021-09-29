import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Input, Alert, Modal, Form, Select, message, Tag, Popconfirm } from 'antd';
import { PlusOutlined, ShopFilled, UserOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import {
  getMaintainList,
  deleteMaintainList,
  addMaintainList,
  searchMaintainList,
} from '@/services/maintain';

const MaintainManage = () => {
  console.log(data);
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);

  let [data, setData] = useState([]);

  useEffect(async () => {
    const resData = await getMaintainList();
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
    const res = await addMaintainList(value);
    console.log(555555555, res);
    if (res === 'success') {
      message.success('添加成功');
    } else {
      message.error('添加失败');
    }
    setIsModalVisible(false);
    console.log(data);
    const resData = await getMaintainList();
    setData(resData);
    actionRef.current.reload();
  };

  // 删除
  const confirmDelete = async (id) => {
    console.log('jsx', id);
    await deleteMaintainList(id);
    const resData = await getMaintainList();
    setData(resData);
    actionRef.current.reload();
  };

  const columns = [
    {
      title: '维护日期',
      dataIndex: 'date',
      hideInSearch: true,
    },
    {
      title: '房间',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Tag icon={<ShopFilled />} color="#3b5999">
            {record.room}
          </Tag>
        );
      },
    },
    {
      title: '维护内容',
      dataIndex: 'content',
      hideInSearch: true,
    },
    {
      title: '维护人',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Tag icon={<UserOutlined />} color="#55acee">
            {record.person}
          </Tag>
        );
      },
    },
    {
      title: '填报时间',
      dataIndex: 'report_time',
      hideInSearch: true,
    },
    {
      title: '删除',
      hideInSearch: true,
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
        // search={{
        //   labelWidth: 'auto',
        // }}
        dateFormatter="string"
        headerTitle="待处理报修管理"
        dataSource={data}
        // request={async () => ({ data: await getMaintainList() })}
        // toolBarRender={() => []}
        toolbar={{
          search: {
            onSearch: async (value) => {
              const res = await searchMaintainList(value);
              // setData([...res]);
              setData(res);
              console.log(data);
              actionRef.current.reload();
            },
            placeholder: '请输入房间号',
          },
          actions: [
            <Button type="primary" key="primary" onClick={showForm}>
              <PlusOutlined /> 添加记录
            </Button>,
          ],
        }}
      />

      <Modal title="添加维修记录" footer={null} visible={isModalVisible} onCancel={closeModal}>
        <ProForm
          onFinish={(value) => {
            handleForm(value);
          }}
        >
          <ProFormDatePicker width="md" name="date" label="维护时间" rules={[{ required: true }]} />
          {/*<ProFormText name="date" label="维护时间" rules={[{ required: true }]} />*/}
          <ProFormText name="room" label="房间" rules={[{ required: true }]} />
          <ProFormText name="content" label="维护内容" rules={[{ required: true }]} />
          <ProFormText name="person" label="维护人" rules={[{ required: true }]} />
          {/*<ProFormText name="report_time" label="填报时间" rules={[{ required: true }]} />*/}
          <ProFormDatePicker
            width="md"
            name="report_time"
            label="填报时间"
            rules={[{ required: true }]}
          />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default MaintainManage;
