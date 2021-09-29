let videoList = [
  {
    id: 0,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '@cword(30,50)',
    content_video:
      'https://vd3.bdstatic.com/mda-md8sf2tzutaihaub/hd/cae_h264/1617964939/mda-md8sf2tzutaihaub.mp4',
    status: '0', //显示、不显示
  },
  {
    id: 1,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '文字内容',
    content_video: 'url',
    status: '0', //显示、不显示
  },
  {
    id: 2,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '文字内容',
    content_video: 'url',
    status: '0', //显示、不显示
  },
  {
    id: 3,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '文字内容',
    content_video: 'url',
    status: '0', //显示、不显示
  },
  {
    id: 4,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '文字内容',
    content_video: 'url',
    status: '0', //显示、不显示
  },
  {
    id: 5,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '文字内容',
    content_video: 'url',
    status: '0', //显示、不显示
  },
  {
    id: 6,
    title: '实验室开通借用啦',
    publisher: '郑义',
    publish_time: '2021-03-01 18:00:05',
    content_text: '文字内容',
    content_video: 'url',
    status: '0', //显示、不显示
  },
];

// let videoLists = Mock.mock(
//   'GET /api/videoList', {
//     id: 6,
//     title: '@crows',
//     publisher: '郑义',
//     publish_time: '2021-03-01 18:00:05',
//     content_text: '文字内容',
//     content_video: 'url',
//     status: '0', //显示、不显示
//   },
// );

export default {
  // 获取报修列表
  'GET /api/videoList': videoList,

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
