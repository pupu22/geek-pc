import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const GeekLayout = () => {
  // 获取当前 激活的path路径
  const location = useLocation()
  const selectedKey = location.pathname
  const { userStore, loginStore, channelStore } = useStore()

  //获取用户的信息, 由于这是副作用，因此使用useEffect方法，只在最开始执行一次
  // 获取文章频道
  useEffect(() => {
    try{
      userStore.getUserInfo()
      channelStore.loadChannelList()
    } catch {}
  }, [userStore, channelStore])

  // 退出登录 
  const navigate  = useNavigate()
  const confirm = ()=>{
    loginStore.loginOut()
    navigate('/login')
  }
  const cancel = ()=>{

  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" 
              onConfirm={confirm}
              onCancel={cancel}
              okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={170} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout) 