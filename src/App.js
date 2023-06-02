import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import {AuthRoute} from './components/AuthRoute';
import './App.css'
import Article from './pages/Article';
import Home from './pages/Home';
import Publish from './pages/Publish';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
           {/* 需要鉴权的路由 */}
          <Route path='/' element= {<AuthRoute><Layout/></AuthRoute>}>
            <Route index element= {<Home/>}></Route>
            <Route path="article" element= {<Article/>}></Route>
            <Route path="publish" element= {<Publish/>}></Route>
          </Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>    
    </BrowserRouter>

  );
}

export default App;
