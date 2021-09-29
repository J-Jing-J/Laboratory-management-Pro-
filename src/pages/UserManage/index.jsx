import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tag, Button, Popconfirm, Form, Input, Select, Modal, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { getUserList } from '@/services/userManage';

const { Option } = Select;
const UserManage = () => {
  const actionRef = useRef();
  let [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  let [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  // 打开添加表单的事件
  const showFormAdd = () => {
    setIsModalVisibleAdd(true);
  };

  // 点击模态框关闭的事件
  const closeModalAdd = () => {
    setIsModalVisibleAdd(false);
  };

  // 打开修改表单的事件
  const showFormEdit = () => {
    setIsModalVisibleEdit(true);
  };

  // 点击模态框关闭的事件
  const closeModalEdit = () => {
    setIsModalVisibleEdit(false);
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

  const level = [
    <Tag color="magenta">系统管理员</Tag>,
    <Tag color="green">中心管理员</Tag>,
    <Tag color="geekblue">学院教师</Tag>,
    <Tag color="gold">匿名用户</Tag>,
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      render: (_, record) => {
        return (
          <Tag icon={<UserOutlined />} color="#2db7f5">
            {record.username}
          </Tag>
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '用户类别',
      dataIndex: 'level',
      render: (_, record) => {
        return level[record.level];
      },
    },
    {
      title: '上次登录时间',
      dataIndex: 'last_login_time',
      hideInSearch: true,
    },
    {
      title: '办公室',
      dataIndex: 'office',
      hideInSearch: true,
    },
    {
      title: '手机号码',
      dataIndex: 'telephone_number',
      hideInSearch: true,
    },
    {
      title: '办公电话',
      dataIndex: 'office_phone_number',
      hideInSearch: true,
    },
    {
      title: '操作',
      render: (_, record) => {
        let editOperation = [];
        editOperation.push(
          <a onClick={() => showFormEdit()} key={0}>
            修改{' '}
          </a>,
        );
        editOperation.push(
          <Popconfirm
            okButtonProps={record.id}
            placement="top"
            title="永久删除不能恢复，是否确认删除"
            // onConfirm={() => deleteRoomList(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <a style={{ color: 'red' }} type="danger" ghost>
              删除
            </a>
          </Popconfirm>,
        );
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
        headerTitle="用户管理"
        // dataSource={data}
        request={async () => ({ data: await getUserList() })}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => showFormAdd()}>
            <PlusOutlined /> 添加记录
          </Button>,
        ]}
      />

      <Modal
        title="更改角色信息"
        footer={null}
        visible={isModalVisibleEdit}
        onCancel={closeModalEdit}
      >
        <ProForm
          onFinish={(value) => {
            handleForm(value);
          }}
        >
          <Form.Item
            name="role"
            label="角色名称"
            hasFeedback
            rules={[{ required: true, message: '请选择身份等级' }]}
          >
            <Select placeholder="请选择身份等级" defaultValue="系统管理员">
              <Option value="0">系统管理员</Option>
              <Option value="1">中心管理员</Option>
              <Option value="2">学院教师</Option>
              <Option value="3">匿名用户</Option>
            </Select>
          </Form.Item>
        </ProForm>
      </Modal>

      <Modal
        title="添加角色信息"
        footer={null}
        visible={isModalVisibleAdd}
        onCancel={closeModalAdd}
      >
        <ProForm
          onFinish={(value) => {
            handleForm(value);
          }}
        >
          <Form.Item
            name="role"
            label="角色名称"
            hasFeedback
            rules={[{ required: true, message: '请选择身份等级' }]}
          >
            <Select placeholder="请选择身份等级">
              <Option value="0">系统管理员</Option>
              <Option value="1">中心管理员</Option>
              <Option value="2">学院教师</Option>
              <Option value="3">匿名用户</Option>
            </Select>
          </Form.Item>
          <ProFormText name="username" label="用户名" rules={[{ required: true }]} />
          <ProFormText name="name" label="姓名" rules={[{ required: true }]} />
          <ProFormText name="office" label="办公室" rules={[{ required: true }]} />
          <ProFormText name="telephone_number" label="手机号" rules={[{ required: true }]} />
          <ProFormText name="office_phone_number" label="办公室号码" rules={[{ required: true }]} />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default UserManage;
