import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Image,
  Radio,
  Popover,
  Alert,
  Modal,
  Form,
  Select,
  message,
  Tag,
  Popconfirm,
} from 'antd';
import { FileSearchOutlined, DownOutlined, DesktopOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import { getEquipmentList, getRoomList, deleteRoom } from '@/services/equipment';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Equipment = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);
  let [equipmentList, setEquipmentList] = useState([]);

  useEffect(async () => {
    const resData = await getEquipmentList();
    setEquipmentList(resData);
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

  // 删除教室
  const deleteRoomList = async (id) => {
    console.log(id);
    const res = await deleteRoom(id);
    console.log(res);
    actionRef.current.reload();
  };

  // 修改状态
  const changeState = async (id, status) => {
    const res = await changeRepairListState({ id, status });
    actionRef.current.reload();
  };

  const status = [
    <Tag color="magenta">在用</Tag>,
    <Tag color="green">待报废</Tag>,
    <Tag color="geekblue">已报废</Tag>,
    <Tag color="gold">仓库</Tag>,
  ];

  const columns = [
    {
      title: '教室代码',
      dataIndex: 'code',
      render: (_, record) => {
        return <Tag color="cyan">{record.code}</Tag>;
      },
    },
    {
      title: '教室名称',
      dataIndex: 'room_name',
    },
    {
      title: '教室类型',
      dataIndex: 'type',
      render: (_, record) => {
        return <Tag color="purple">{record.type}</Tag>;
      },
    },
    {
      title: '负责人',
      dataIndex: 'administrator',
      hideInSearch: true,
    },
    {
      title: '所在楼栋',
      dataIndex: 'in_building',
      hideInSearch: true,
    },
    {
      title: '实验室描述',
      dataIndex: 'description',
      hideInSearch: true,
      render: (_, record) => {
        return [
          <Popover content={record.description} title="描述详情">
            <Button type="primary" size="small" icon={<FileSearchOutlined />}>
              查看介绍
            </Button>
          </Popover>,
        ];
      },
    },
    {
      title: '介绍图片',
      dataIndex: 'picture_url',
      hideInSearch: true,
      render: (_, record) => {
        return [
          <Image
            width={60}
            src={record.picture_url}
            placeholder={<Image preview={false} src={record.picture_url} width={200} />}
          />,
        ];
      },
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => {
        let editOperation = [];
        editOperation.push(
          <a onClick={() => changeState(record.id, 0)} key={0}>
            修改{' '}
          </a>,
        );
        editOperation.push(
          <Popconfirm
            okButtonProps={record.id}
            placement="top"
            title="永久删除不能恢复，是否确认删除"
            onConfirm={() => deleteRoomList(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <a type="danger" ghost>
              删除
            </a>
          </Popconfirm>,
        );
        return editOperation;
      },
    },
  ];

  const expandColumns = [
    {
      title: '资产编号',
      dataIndex: 'code',
    },
    {
      title: '资产名称',
      dataIndex: 'equipment_name',
    },
    {
      title: '型号',
      dataIndex: 'model',
      render: (_, record) => {
        return (
          <Tag icon={<DesktopOutlined />} color="#87d068">
            {record.model}
          </Tag>
        );
      },
    },
    {
      title: '配置',
      dataIndex: 'configuration',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '购置日期',
      dataIndex: 'purchase_date',
    },
    {
      title: '所在位置',
      dataIndex: 'position',
    },
    {
      title: '责任人',
      dataIndex: 'administrator',
    },
    {
      title: '资产状态',
      dataIndex: 'status',
      render: (_, record) => {
        return status[record.status];
      },
    },
  ];
  const expandedRowRender = () => {
    return (
      <ProTable
        rowKey="id"
        columns={expandColumns}
        request={async () => ({ data: await getEquipmentList() })}
        headerTitle={false}
        search={false}
        options={false}
        pagination={false}
      />
    );
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        request={async () => ({ data: await getRoomList() })}
        expandable={{ expandedRowRender }}
        search={{ labelWidth: 'auto' }}
        dateFormatter="string"
        headerTitle="设备管理"
        options={false}
        toolBarRender={() => [
          <Button key="show">查看日志</Button>,
          <Button key="out">
            导出数据
            <DownOutlined />
          </Button>,
          <Button key="primary" type="primary">
            创建应用
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

export default Equipment;
