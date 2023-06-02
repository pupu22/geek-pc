// 封装localStorage 存取token
const TOKEN_KEY = 'geek_pc' //自定义，设置为什么都可以
const getToken = ()=> localStorage.getItem(TOKEN_KEY)
const setToken =  token => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export {getToken, setToken, clearToken}