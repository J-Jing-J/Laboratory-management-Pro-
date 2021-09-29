let repairList = [
  {
    id: 0,
    room: '木铎楼C301',
    type: '计算机',
    order_number: '25号',
    description: '无法开机',
    status: '0',
  },
  {
    id: 1,
    room: '木铎楼C302',
    type: '计算机',
    order_number: '25号',
    description: '无法开机',
    status: '0',
  },
  {
    id: 2,
    room: '木铎楼C303',
    type: '计算机',
    order_number: '25号',
    description: '无法开机',
    status: '2',
  },
  {
    id: 3,
    room: '木铎楼C301',
    type: '计算机',
    order_number: '25号',
    description: '无法开机',
    status: '0',
  },
  {
    id: 4,
    room: '木铎楼C302',
    type: '计算机',
    order_number: '25号',
    description: '无法开机',
    status: '1',
  },
  {
    id: 5,
    room: '木铎楼C303',
    type: '计算机',
    order_number: '25号',
    description: '无法开机',
    status: '2',
  },
];

export default {
  // 获取报修列表
  'GET /api/repairManage': repairList,

  // 添加数据
  // req.body是提交过来的数据
  'POST /api/addRepairList': (req, res) => {
    const item = {
      id: repairList.length + 1,
      room: req.body.room,
      type: req.body.type,
      order_number: req.body.order_number,
      description: req.body.description,
      status: req.body.status || 0,
    };
    repairList.unshift(item);
    res.end(JSON.stringify(req.body));
    // repairList: "121212"
  },

  'PUT /api/changeRepairListState': (req, res) => {
    const { id, status } = req.body;
    repairList.map((item, index) => {
      if (item.id === id) repairList[index].status = status;

      // if (item.id === id) {
      //   item.status = status
      //   return item
      // }
    });
    res.end(JSON.stringify(req.body));
    // repairList: "121212"
  },

  // 删除
  'POST /api/deleteRepairListState': (req, res) => {
    const { id } = req.body;
    repairList.map((item, index) => {
      if (item.id * 1 === id * 1) repairList.splice(index, 1);
    });
    res.end(JSON.stringify(repairList));
    // repairList.filter((item, index) => {
    //   return item.id*1 !== id*1
    // })
  },

  'POST /api/searchRepairListState': (req, res) => {
    const { id } = req.body;
    const resData = repairList.filter((item, index) => {
      return item.id * 1 !== id * 1;
    });
    return resData;
  },
};
