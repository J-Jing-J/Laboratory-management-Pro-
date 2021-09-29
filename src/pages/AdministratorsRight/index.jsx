import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, Form, Modal, Input, Checkbox, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { getRoleList, getRightList } from '@/services/administratorsRight';

const { Option } = Select;

const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);
  let [isDrawerVisible, setIsDrawerVisible] = useState(false);
  let [isChildrenDrawerVisible, setIsChildrenDrawerVisible] = useState(false);
  let [rightList, setRightList] = useState([]);
  // let [defaultRightList, setDefaultRightList] = useState([])
  // let [rightContent, setRightContent] = useState([])
  let [defaultRightContent, setDefaultRightContent] = useState([]);

  useEffect(async () => {
    const resData = await fetchRightList();
  }, []);

  const rightContent = ['添加', '修改', '查找', '删除'];
  const defaultRightList = ['添加', '修改', '查找'];

  // 打开添加表单的事件
  const showForm = () => {
    setIsModalVisible(true);
  };
  // 点击模态框关闭的事件
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const showChildrenDrawer = () => {
    setIsChildrenDrawerVisible(true);
  };

  const onChildrenDrawerClose = () => {
    setIsChildrenDrawerVisible(false);
  };

  const rightOnChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    showChildrenDrawer();
  };

  const rightContentOnChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const fetchRightList = async () => {
    const res = await getRightList();
    setRightList(res);
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

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'role',
      width: 150,
      align: 'center',
    },
    {
      title: '操作',
      hideInSearch: true,
      width: 100,
      align: 'center',
      render: (_, record) => {
        return [
          <Button style={{ marginRight: '20px' }} type="primary" onClick={showForm}>
            修改
          </Button>,
          <Button onClick={showDrawer} style={{ marginRight: '20px' }} type="primary" ghost>
            编辑权限
          </Button>,
          <Button danger type="primary">
            删除
          </Button>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        scroll={{ x: '100%' }}
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="角色权限管理"
        // dataSource={data}
        request={async () => ({ data: await getRoleList() })}
      />

      <Modal title="修改角色" footer={null} visible={isModalVisible} onCancel={closeModal}>
        <ProForm
          onFinish={(value) => {
            handleForm(value);
          }}
        >
          <Form.Item
            name="role"
            label="角色名称"
            hasFeedback
            rules={[{ required: true, message: '请输入身份等级' }]}
          >
            <Input />
          </Form.Item>
        </ProForm>
      </Modal>

      <Drawer
        title="编辑权限"
        width={250}
        closable={true}
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <Checkbox.Group
          options={rightList}
          defaultValue={defaultRightList}
          onChange={rightOnChange}
        >
          {' '}
        </Checkbox.Group>
        <Drawer
          title="编辑具体操作权限"
          width={250}
          closable={true}
          onClose={onChildrenDrawerClose}
          visible={isChildrenDrawerVisible}
        >
          <Checkbox.Group
            options={rightContent}
            defaultValue={defaultRightContent}
            onChange={rightContentOnChange}
          >
            {' '}
          </Checkbox.Group>
        </Drawer>
      </Drawer>
    </PageContainer>
  );
};

export default RepairManage;
