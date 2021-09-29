let noticeList = [
  {
    id: 0,
    title: '维修公告',
    publisher: '蒋静',
    publish_time: '2021.06.20',
    is_publish: true,
    content: '今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么'
  },
  {
    id: 1,
    title: '维修公告',
    publisher: '蒋静',
    publish_time: '2021.06.20',
    is_publish: true,
    content: '今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么'
  },
  {
    id: 2,
    title: '维修公告',
    publisher: '蒋静',
    publish_time: '2021.06.20',
    is_publish: false,
    content: '今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么'
  },
  {
    id: 3,
    title: '维修公告',
    publisher: '蒋静',
    publish_time: '2021.06.20',
    is_publish: false,
    content: '今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么'
  },
]

export default {
  'GET /api/admin/notice': noticeList,

  'PUT /api/changePublishListState': (req, res) => {
    const {id, is_publish} = req.body
    noticeList.map((item, index) => {
      if (item.id*1 === id*1) noticeList[index].is_publish = !is_publish
      // if (item.id === id) {
      //   item.status = status
      //   return item
      // }
    })
    res.end(JSON.stringify(req.body))
    // repairList: "121212"
  },

  // 编辑公告
  'PUT /api/editNotice': (req, res) => {
    const {id, title, is_publish, content} = req.body
    noticeList.map((item, index) => {
      if (item.id*1 === id*1) {
        noticeList[index].title = title
        noticeList[index].is_publish = is_publish
        noticeList[index].content = content
      }
      // if (item.id === id) {
      //   item.status = status
      //   return item
      // }
    })
    res.end(JSON.stringify(req.body))
    // repairList: "121212"
  },


  'POST /api/addNotice': (req, res) => {
    const {title, publisher, publish_time, is_publish, content} = req.body
    const item = {
      id: noticeList.length + 1,
      title: '公告1',
      publisher: '蒋静',
      publish_time: '2021.06.30',
      is_publish: true,
      content: '电脑坏了啦啦啦啦啦啦',
    }
    noticeList.unshift(item)
    res.end(JSON.stringify(req.body))
    // repairList: "121212"
  },

  'GET /api/noticeDetail': (req, res) => {
    res.end(JSON.stringify(req.body))
    const item = {
        id: 0,
        title: '维修公告',
        publisher: '蒋静',
        publish_time: '2021.06.20',
        is_publish: true,
        content: '今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么今晚吃什么'
    }

  }


}
