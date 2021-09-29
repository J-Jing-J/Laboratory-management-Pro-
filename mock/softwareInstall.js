let softwareList = [
  {
    id: 0,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
  {
    id: 1,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
  {
    id: 2,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
  {
    id: 3,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
  {
    id: 3,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
  {
    id: 3,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
  {
    id: 3,
    room: '木铎楼C301',
    demand: 'office2019、vs2019',
    applicant: '蒋静',
    apply_time: '2021-03-02 10:02:03',
    confirm_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    handler: '陶子源',
    handle_result: '已安装',
  },
];

export default {
  // 获取报修列表
  'GET /api/softwareList': softwareList,

  // 添加数据
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
