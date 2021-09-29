let repairList = [
  {
    id: 1,
    class: {},
  },
];

export default {
  // 获取报修列表
  'GET /api/repairManage': repairList,

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
