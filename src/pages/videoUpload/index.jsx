import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Upload, Alert, Modal, Button, Select, message } from 'antd';
import { SettingOutlined, EditOutlined, EllipsisOutlined, UploadOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRepairManage, addRepairList, changeRepairListState } from '@/services/repairManage';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { getVideoList } from '@/services/videoUpload';

const { Meta } = Card;
const RepairManage = () => {
  const actionRef = useRef();

  let [isModalVisible, setIsModalVisible] = useState(false);

  let [videoList, setVideoList] = useState([]);

  useEffect(async () => {
    const resData = await getVideoList();
    setVideoList(resData);
    console.log(videoList);
  }, []);

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

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

  const videoListDOM = videoList.map((item, index) => (
    <ProCard
      title={item.title}
      colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
      layout="center"
      hoverable
      bordered
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <video src={item.content_video} controls="controls" style={{ marginRight: '10px' }}></video>
      <Meta style={{ marginRight: '180px' }} title={item.title} description={item.content_text} />
    </ProCard>
  ));

  return (
    <PageContainer>
      <ProCard
        style={{ marginTop: 8 }}
        gutter={[16, 16]}
        wrap
        title="安全教育视频上传"
        extra={
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        }
      >
        {videoListDOM}
      </ProCard>

      <Modal title="添加维修记录" footer={null} visible={isModalVisible} onCancel={closeModal}>
        <ProForm
          onFinish={(value) => {
            handleForm(value);
          }}
        >
          <ProFormText name="room" label="房间" rules={[{ required: true }]} />
          <ProFormText name="type" label="设备类型" rules={[{ required: true }]} />
          <ProFormText name="ord er_number" label="设备编号" rules={[{ required: true }]} />
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
