import { getRepairManage } from "@/services/repairManage";

export default {
  namespace: 'repairTodo',

  state: {
    repairTodolist: []
  },

  effects: {
    *getRepairTodolist(_, {call, put}) {
      // 调用方法获取数据
      const resData = yield call(getRepairManage)
      yield put({
        type: 'setRepairTodolist',
        payload: resData
      })

    }
  },

  reducers: {
    setRepairTodolist(state, action) {
      return {
        ...state,
        repairTodolist: action.payload

      }
    }

  }




}
