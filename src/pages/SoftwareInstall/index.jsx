import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Tag, Button, Modal, Form, Select, message } from 'antd';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import { getSoftwareList } from '@/services/softwareInstall';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

const { Step } = Steps;

const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);

  let [softList, setSoftList] = useState([]);

  useEffect(async () => {
    const resData = await getSoftwareList();
    setSoftList(resData);
  }, []);

  let softwareListDOM = softList.map((item, index) => (
    <ProCard
      title={`${item.demand}（${item.handle_result}）`}
      gutter={16}
      style={{ marginTop: '10px', color: '#574b90' }}
      collapsible
      defaultCollapsed
      headerBordered
      hoverable
      onCollapse={(collapse) => console.log(collapse)}
      extra={[<Button type="primary">已完成</Button>, <Button type="danger">拒绝</Button>]}
    >
      <ProCard hoverable colSpan={6} layout="center" bordered style={{ height: '100px' }}>
        {`申请安装地点：${item.room}`}
      </ProCard>
      <ProCard hoverable colSpan={12} layout="center" bordered style={{ height: '100px' }}>
        <Steps size="small" current={2}>
          <Step title="申请时间" description={item.apply_time} />
          <Step title="确认时间" description={item.confirm_time} />
          <Step title="处理时间" description={item.handle_time} />
        </Steps>
      </ProCard>
      <ProCard hoverable colSpan={6} layout="center" style={{ height: '100px' }} bordered>
        <Tag icon={<MehOutlined />} color="success">
          {`申请人：${item.applicant}`}
        </Tag>
        <br />
        <Tag icon={<SmileOutlined />} color="processing">
          {`确认人：${item.handler}`}
        </Tag>
      </ProCard>
    </ProCard>
  ));

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

  return (
    <PageContainer>
      {softwareListDOM}

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
