import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Image, Radio, Popover, Alert, Modal, Form, Select, message, Tag } from 'antd';
import { FileSearchOutlined, DownOutlined, DesktopOutlined, UserOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getPurchaseList } from '@/services/purchase';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);

  let [purchaseList, setPurchaseList] = useState([]);

  useEffect(async () => {
    const resData = await getPurchaseList();
    setPurchaseList(resData);
  }, []);

  let mockPurchase = purchaseList[1];

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
    // const res = await addRepairList(value);
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

  const status = [
    <Tag color="magenta">申请</Tag>,
    <Tag color="green">采购</Tag>,
    <Tag color="geekblue">入库</Tag>,
    <Tag color="gold">领取</Tag>,
    <Tag color="blue">归还</Tag>,
  ];

  const tag = [<Tag color="#f50">拒绝</Tag>, <Tag color="#87d068">同意</Tag>];

  const columns = [
    {
      title: '申请人',
      dataIndex: 'applicant',
      render: (_, record) => {
        return (
          <Tag icon={<UserOutlined />} color="#2db7f5">
            {record.applicant}
          </Tag>
        );
      },
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      hideInSearch: true,
    },
    {
      title: '处理时间',
      dataIndex: 'handle_time',
      hideInSearch: true,
    },
    {
      title: '处理结果',
      dataIndex: 'result',
      hideInSearch: true,
      render: (_, record) => {
        return tag[record.result];
      },
    },
    {
      title: '采购状态',
      dataIndex: 'status',
      render: (_, record) => {
        return status[record.status];
      },
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => {
        let editOperation = [];
        editOperation.push(
          <a
            // onClick={() => changeState(record.id, 0)}
            key={0}
          >
            修改{' '}
          </a>,
        );
        editOperation.push(
          <a
            // onClick={() => changeState(record.id, 1)}
            key={1}
          >
            删除{' '}
          </a>,
        );
        return editOperation;
      },
    },
  ];

  const expandedRowRender = () => {
    return (
      <ProCard
        hoverable
        title="用途及需求描述"
        tooltip="这是申请人提交时的详细描述"
        colSpan={15}
        layout="center"
        bordered
      >
        {mockPurchase.demand}
      </ProCard>
    );
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        request={async () => ({ data: await getPurchaseList() })}
        expandable={{ expandedRowRender }}
        search={{ labelWidth: 'auto' }}
        dateFormatter="string"
        headerTitle="设备管理"
        options={false}
        toolBarRender={() => [<Button key="show">查看日志</Button>]}
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
