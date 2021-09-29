let classroomBorrowList = [
  {
    id: 0,
    room: '木铎楼C301',
    demand: '项目讨论，用电脑，30人，讨论，懂吗？学习',
    borrower: '蒋静',
    borrow_time: '2021-03-04',
    apply_time: '2021-03-04 10:02:03',
    handle_time: '2021-03-04 10:02:03',
    result: '0',
  },
  {
    id: 1,
    room: '木铎楼C502',
    demand:
      '就是要用，你管我？你管我？就是要用，你管我？你管我？就是要用，你管我？你管我？就是要用，你管我？你管我？就是要用，你管我？你管我？就是要用，你管我？你管我？就是要用，你管我？你管我？',
    borrower: '陶子源',
    borrow_time: '2021-07-04',
    apply_time: '2021-03-04 10:56:03',
    handle_time: '2021-03-04 20:02:03',
    result: '1',
  },
  {
    id: 2,
    room: '木铎楼C301',
    demand:
      '不知道写什么理由，怎么办，你借不借？？？？？？？？你借不借？？？？？？？？你借不借？？？？？？？？你借不借？？？？？？？？你借不借？？？？？？？？你借不借？？？？？？？？',
    borrower: '陈一明',
    borrow_time: '2021-03-04',
    apply_time: '2021-03-04 10:02:03',
    handle_time: '2021-03-04 10:02:03',
    result: '2',
  },
  {
    id: 3,
    room: '木铎楼C301',
    demand: '借教室，玩捉迷藏，玩丢手绢',
    borrower: '董建荣',
    borrow_time: '2021-03-04',
    apply_time: '2021-03-04 10:02:03',
    handle_time: '2021-03-04 10:02:03',
    result: '2',
  },
  {
    id: 4,
    room: '木铎楼A201',
    demand: '做实验，化学实验 物理实验 什么实验都做',
    borrower: '闫星宇',
    borrow_time: '2021-03-04',
    apply_time: '2021-03-04 10:02:03',
    handle_time: '2021-03-04 10:02:03',
    result: '0',
  },
  {
    id: 5,
    room: '木铎楼A502',
    demand: '啦啦啦啦啦啦啦啦啦啦啦不知道写什么',
    borrower: '蒋静',
    borrow_time: '2021-03-04',
    apply_time: '2021-03-04 10:02:03',
    handle_time: '2021-03-04 10:02:03',
    result: '1',
  },
];

export default {
  // 获取报修列表
  'GET /api/classroomBorrowList': classroomBorrowList,

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
  'PUT /api/changeRepairListState': (req, res) => {
    const { id, status } = req.body;
    classroomBorrowList.map((item, index) => {
      if (item.id * 1 === id * 1) classroomBorrowList[index].status = status;

      // if (item.id === id) {
      //   item.status = status
      //   return item
      // }
    });
    res.end(JSON.stringify(req.body));
    // repairList: "121212"
  },
};
