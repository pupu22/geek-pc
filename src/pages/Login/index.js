import { Form, Input, Button, Checkbox , Card} from 'antd'
import './index.scss'
function Login (){
    return (
        <div className="login">
            <Card className="login-container">
                <div className='login-font'>账号登录</div>
                <Form>
                    <Form.Item>
                        <Input size='large' placeholder='请输入手机号'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input size='large' placeholder='请输入验证码'/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className='login-checkbox-label'>
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>            
                </Form>
            </Card>
        </div>

    )
}
export default Login