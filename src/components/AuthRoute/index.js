// 路由鉴权 组件
// 判断token是否存在，如果存在，直接正常渲染，如果不存在，重定向到登录路由

const { getToken } = require("@/utils/token");
const { Navigate } = require("react-router-dom");

// 高阶组件： 把一个组件当成另一个组件的参数传入
// 然后通过一定的判断 返回新的组件
function AuthRoute ({ children }){
    const isToken = getToken()
    if(isToken){
        return <>{children}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}
export  { AuthRoute }