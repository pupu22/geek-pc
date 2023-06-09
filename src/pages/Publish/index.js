import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
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

    // 这里关键位置： 需要做数据格式化
    const formatList = fileList.map(file => {
      // 上传完毕，做数据处理
      if(file.response){
        return {
          url: file.response.url
        }
      }
      // 在上传中时，不做处理
      return file
    })
    setFileList(formatList)
    //将fileList 存入到仓库中一份
    cachaImgList.current = formatList
  }

  // 切换图片数量 radio 
  //存放 图片数量
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    const count = e.target.value
    setImgCount(count)
    // 从仓库里面取对应的图片数量，交给我们用来渲染图片列表的fileList
    if(count === 1){
      // 如果为单图模式，拿到第一张图片
      const img = cachaImgList.current? cachaImgList.current[0] : []
      setFileList(img? [img]:[])
    } else if(count === 3){
      setFileList(cachaImgList.current)
    }
  }

  // 文案适配， 获取路由参数id，如果文章存在，则文案为修改文章，否则为发布文章
  const [params] = useSearchParams()
  const id = params.get('id')

  //数据回填 1.表单回填 2.暂存列表  3.更新组件fileList
  const form = useRef(null)
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      // 表单数据回填
      form.current.setFieldsValue({...res.data, type: res.data.cover.type})
      const formatImgList = res.data.cover.images.map(url => ({url}))
      setFileList(formatImgList)

      // cachaImgList.current也是一个对象数组，因此也要进行数据处理
      cachaImgList.current = formatImgList
    }
    // 必须是编辑状态，才可以发送请求
    if(id){
      loadDetail()
    } 
  }, [id])

  //表单数据提交
  const navigate = useNavigate()
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
        images: fileList.map(item => item.url)
      }
    }
    if(id){
      await http.put(`/mp/articles/${id}?draft=false`,params)
    } else{
      await http.post('/mp/articles?draft=false', params)
    }
    
    // 跳转列表，提示用户
    navigate('/article')
    message.success(`${id? '更新成功': '发布成功'}`)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id? '编辑':'发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={form}
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
                {id? '更新文章' :'发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish