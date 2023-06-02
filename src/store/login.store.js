import {makeAutoObservable} from 'mobx'
import { http } from '@/utils'
import { setToken, getToken, clearToken } from '@/utils/token'
class LoginStore {
    token = getToken() || ''
    constructor(){
        makeAutoObservable(this)
    }
    login = async({mobile, code}) => {
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile,
            code
          })
        this.token = res.data.token
        setToken(res.data.token)
    }

    // 退出登录
    loginOut = () => {
        this.token = ''
        clearToken()
    }
}
export default LoginStore