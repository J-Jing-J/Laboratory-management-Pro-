let purchaseList = [
  {
    id: 0,
    demand: '项目讨论，用电脑，30人',
    apply_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    applicant: '蒋静',
    result: 0, //同意、不同意
    status: '0', //申请、采购、入库、领取、归还
  },
  {
    id: 1,
    demand: '项目讨论，用电脑，30人',
    apply_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    applicant: '蒋静',
    result: 1, //同意、不同意
    status: '1', //申请、采购、入库、领取、归还
  },
  {
    id: 2,
    demand: '项目讨论，用电脑，30人',
    apply_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    applicant: '蒋静',
    result: 0, //同意、不同意
    status: '2', //申请、采购、入库、领取、归还
  },
  {
    id: 3,
    demand: '项目讨论，用电脑，30人',
    apply_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    applicant: '蒋静',
    result: 1, //同意、不同意
    status: '3', //申请、采购、入库、领取、归还
  },
  {
    id: 4,
    demand: '项目讨论，用电脑，30人',
    apply_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    applicant: '蒋静',
    result: 1, //同意、不同意
    status: '4', //申请、采购、入库、领取、归还
  },
  {
    id: 5,
    demand: '项目讨论，用电脑，30人',
    apply_time: '2021-03-02 10:02:03',
    handle_time: '2021-03-02 10:02:03',
    applicant: '蒋静',
    result: 0, //同意、不同意
    status: '4', //申请、采购、入库、领取、归还
  },
];

export default {
  // 获取报修列表
  'GET /api/purchaseList': purchaseList,

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
