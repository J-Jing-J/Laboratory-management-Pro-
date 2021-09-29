import React from 'react';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Modal} from "antd";
import {addNotice} from "@/services/noticeManage";

const Create = (props) => {

  const { isModalVisible } = props
  const { isShowModal } = props
  const { actionRef } = props

  const createNotice = async values => {
    console.log(values);
    const response = await addNotice(values)
    console.log(response);
    message.success('添加成功')
    isShowModal(false)
    actionRef.current.reload()
  }

  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
    >
      <ProForm
        onFinish={ values => createNotice(values) }
      >
        <ProFormText
          name="title"
          label="标题"
          placeholder="请输入标题"
          rules={[
            {required: true, message: '请输入标题'}
          ]}
        />
        <ProFormText
          name="publisher"
          label="发布者"
          placeholder="请输入发布者"
          rules={[
            {required: true, message: '请输入发布者'}
          ]}
        />
        <ProFormText
          name="publish_time"
          label="发布者"
          placeholder="请输入发布时间"
          rules={[
            {required: true, message: '请输入发布时间'}
          ]}
        />
        <ProFormText
          name="is_publish"
          label="发布状态"
          placeholder="请输入发布状态"
          rules={[
            {required: true, message: '请输入发布状态（true或false）'}
          ]}
        />
        <ProFormText
          name="content"
          label="公告内容"
          placeholder="请输入公告内容"
          rules={[
            {required: true, message: '请输入公告内容'}
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Create;
