import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Grid, Alert, Modal, Row, Col, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import { getDutyList } from '@/services/duty';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);

  let [dutyList, setDutyList] = useState([]);

  useEffect(async () => {
    const resData = await getDutyList();
    console.log(resData);
    setDutyList(resData);
    console.log(dutyList);
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

  const tableDOMStyle = {
    width: '100%',
    height: '50px',
    textAlign: 'center',
    marginRight: '0px',
    background: '#b2bec3',
  };

  const classDOMStyle = {
    width: '100%',
    height: '100px',
    textAlign: 'center',
    marginRight: '0px',
    background: '#fab1a0',
  };

  const weekListDOM = dutyList.map((item, index) => (
    <Col span={2}>
      <Card bordered style={tableDOMStyle}>
        {item.week}
      </Card>
      <Card bordered style={classDOMStyle}>
        {item.one_Two}
      </Card>
      <Card bordered style={classDOMStyle}>
        {item.three_four}
      </Card>
      <Card bordered style={classDOMStyle}>
        {item.five_six}
      </Card>
      <Card bordered style={classDOMStyle}>
        {item.seven_eight}
      </Card>
      <Card bordered style={classDOMStyle}>
        {item.nine_ten}
      </Card>
      <Card bordered style={classDOMStyle}>
        {item.eleven_twelve}
      </Card>
      {/*{lessonListDOM}*/}
    </Col>
  ));
  const timeList = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const timeListDOM = timeList.map((item, index) => (
    <Card.Grid style={tableDOMStyle}>{item}</Card.Grid>
  ));

  // 修改状态
  const changeState = async (id, status) => {
    const res = await changeRepairListState({ id, status });
    actionRef.current.reload();
  };

  return (
    <PageContainer>
      <Row gutter={0}>
        <Col span={1}>
          <Card style={tableDOMStyle} bordered>
            {timeListDOM}
          </Card>
        </Col>
        {weekListDOM}
      </Row>
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
