import React, { useEffect }from 'react';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Modal, skeleton} from "antd";
import {addNotice, noticeDetail} from "@/services/noticeManage";

const Create = (props) => {

  const { isModalVisibleEdit } = props
  const { isShowModalEdit } = props
  const { actionRef } = props
  const { editId } = props

  let initialValues = {}
  initialValues.title = '维修公告'
  initialValues.publisher = '蒋静'
  initialValues.publish_time = '2021.06.20'
  initialValues.is_publish = false
  initialValues.content = '今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么'


  useEffect(async () => {
    if (editId !== undefined) {
      // 发送请求公告详情
      // const response = await noticeDetail(editId)
      console.log(1212121);
    }
  }, [])

  console.log(editId);
  const editNotice = async values => {
    const response = await addNotice(values)
    message.success('提交成功')
    isShowModalEdit(false)
    actionRef.current.reload()
  }

  return (
    <Modal
      title="编辑公告"
      visible={isModalVisibleEdit}
      onCancel={() => isShowModalEdit(false)}
      footer={null}
    >
      <ProForm
        onFinish={ values => editNotice(values) }
        initialValues={initialValues}
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
          label="发布时间"
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
            {required: true, message: '请输入发布状态'}
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
