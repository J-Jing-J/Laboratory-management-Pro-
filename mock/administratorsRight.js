let roleList = [
  {
    id: 0,
    role: '系统管理员',
    right: [
      '系统基础数据设置',
      '用户管理',
      '网站公告管理',
      '值班人员设置',
      '维护记录查询',
      '报修记录查询',
      '课表设置',
      '处理软件安装申请',
      '处理教室借用申请',
      '响应采购申请',
      '上传安全教育视频资料',
    ],
  },
  {
    id: 1,
    role: '实验中心管理员',
    right: [
      '系统基础数据设置',
      '用户管理',
      '网站公告管理',
      '值班人员设置',
      '维护记录查询',
      '报修记录查询',
      '课表设置',
      '处理软件安装申请',
      '处理教室借用申请',
      '响应采购申请',
      '上传安全教育视频资料',
    ],
  },
  {
    id: 2,
    role: '学院教师',
    right: ['实验设备报修', '个人资产查询', '采购申请', '软件安装申请', '物资借用申请'],
  },
  {
    id: 3,
    role: '匿名用户',
    right: [
      '查询实验室介绍',
      '查看值班情况',
      '查看实验室课表',
      '实验室借用申请（需登记个人信息）',
      '实验室设备报修',
      '安全教育学习',
      '实验室维护记录',
    ],
  },
];

// 全部权限（目录）
const rightList = [
  // 管理员
  '系统基础数据设置',
  '用户管理',
  '网站公告管理',
  '值班人员设置',
  '维护记录查询',
  '报修记录查询',
  '课表设置',
  '处理软件安装申请',
  '处理教室借用申请',
  '响应采购申请',
  '上传安全教育视频资料',
  // 教师
  '实验设备报修',
  '个人资产查询',
  '采购申请',
  '软件安装申请',
  '物资借用申请',
  // 匿名
  '查询实验室介绍',
  '查看值班情况',
  '查看实验室课表',
  '实验室借用申请（需登记个人信息）',
  '实验室设备报修',
  '安全教育学习',
  '实验室维护记录',
];

export default {
  // 获取报修列表
  'GET /api/roleList': roleList,

  // 获取全部权限列表
  'GET /api/rightList': rightList,

  // // 添加数据
  // // req.body是提交过来的数据
  // 'POST /api/addRepairList': (req, res) => {
  //   const item = {
  //     id: repairList.length + 1,
  //     room: req.body.room,
  //     type: req.body.type,
  //     order_number: req.body.order_number,
  //     description: req.body.description,
  //     status: req.body.status || 0,
  //   };
  //   repairList.unshift(item);
  //   res.end(JSON.stringify(req.body));
  //   // repairList: "121212"
  // },
  //
  // 'PUT /api/changeRepairListState': (req, res) => {
  //   const { id, status } = req.body;
  //   repairList.map((item, index) => {
  //     if (item.id === id) repairList[index].status = status;
  //
  //     // if (item.id === id) {
  //     //   item.status = status
  //     //   return item
  //     // }
  //   });
  //   res.end(JSON.stringify(req.body));
  //   // repairList: "121212"
  // },
};
