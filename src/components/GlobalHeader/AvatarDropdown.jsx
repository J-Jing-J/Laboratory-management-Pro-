import { LogoutOutlined, SettingOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { Badge } from 'antd'
import { getRepairManage } from '@/services/repairManage'

class AvatarDropdown extends React.Component {

  state = {
    todoNum: 0
  }

  async componentDidMount() {
    // 获取数据
    const todoList = await getRepairManage()
    // 筛选待完成项
    const todoNum = todoList.filter(item => item.status == 0).length
    // 修改状态
    this.setState({todoNum})
  }

  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'todo') {
      history.push('/repair-manage')
      return
    }

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }
    history.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="todo">
          <UnorderedListOutlined />
          待处理维修申请
          <Badge offset={[10,0]} count={this.state.todoNum}/>
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>
            {currentUser.name}
            <Badge count={this.state.todoNum} dot={true}/>
          </span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user,todo }) => ({
  currentUser: user.currentUser,
  todo
}))(AvatarDropdown);
