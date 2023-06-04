import { Breadcrumb, Card, Form, Button, 
    Radio,Select ,DatePicker,Table, Tag, Space} from "antd"
import {Link} from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import { http } from "@/utils"


const Article = () =>  {
    const { Option } = Select
    const { RangePicker } = DatePicker
    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width:120,
          render: cover => {
            return <img src={cover} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: data => <Tag color="green">审核通过</Tag>
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Space>
            )
          }
        }
      ]
    
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images:['http://geek.itheima.net/resources/images/15.jpg'],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'wkwebview离线化加载h5资源解决方案' 
        }
    ]
    
    //获取频道列表
    const [channels, setChannels] = useState([])
    useEffect(()=>{
        async function fetchChannels(){
            const res = await http.get('/channels')
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, [])

    //渲染文章表格数据
    const [article, setArticle] = useState({
        list: [],
        count: 0
    })
    //参数管理
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })

    //发送获取文章数据请求
    useEffect(() => {
        async function fetchArticlList(){
            const res = await http.get('/mp/articles', {params})
            const {results, total_count} = res.data
            setArticle({
                list:results,
                count: total_count
            })
        }
        fetchArticlList()
    },[params])
    return (
        <div>
            <Card
              title={
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>内容管理</Breadcrumb.Item>                    
                </Breadcrumb>
              }
              style={{marginBottom: 20}}
            >
            <Form initialValues={{ status: null }}>
                <Form.Item label="状态" name="status">
                    <Radio.Group>
                    <Radio value={null}>全部</Radio>
                    <Radio value={0}>草稿</Radio>
                    <Radio value={1}>待审核</Radio>
                    <Radio value={2}>审核通过</Radio>
                    <Radio value={3}>审核失败</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="频道" name="channel_id" >
                    <Select placeholder="请选择文章频道" style={{width:200}}>
                    {channels.map(item => (
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                    </Select>
                </Form.Item>

                <Form.Item label="日期" name="date">
                    {/* 传入locale属性 控制中文显示*/}
                    <RangePicker       
                        format="YYYY-MM-DD">
                    </RangePicker>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                    筛选
                    </Button>
                </Form.Item>
            </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={article.list} />
            </Card>
        </div>
    )
}
export default Article