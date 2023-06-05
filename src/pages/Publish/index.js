import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { useRef, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  const {channelStore} = useStore()

  //存放上传图片的列表
  const [fileList, setFileList] = useState([])
   //使用useRef声明一个暂存仓库
   const cachaImgList = useRef()

  // 更新上传图片列表
  const onUploadChange = ({ fileList })  => {
    setFileList(fileList)
    //将fileList 存入到仓库中一份
    cachaImgList.current = fileList
  }

  // 切换图片数量 radio 
  //存放 图片数量
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    const count = e.target.value
    setImgCount(count)
    // 从仓库里面取对应的图片数量，交给我们用来渲染图片列表的fileList
    if(imgCount === 1){
      // 如果为单图模式，拿到第一张图片
      const img = cachaImgList.current? cachaImgList.current[0]:[]
      setFileList(img)
    } else if(imgCount === 3){
      setFileList(cachaImgList.current? cachaImgList.current:[])
    }
  }

  //表单数据提交
  const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.response.data.url)
      }
    }
    await http.post('/mp/articles?draft=false', params)
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 &&  (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                maxCount={imgCount}
                multiple={ imgCount > 1 }
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>              
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill 
              className='publish-quill'
              theme="snow"
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish