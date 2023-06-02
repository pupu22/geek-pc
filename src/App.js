import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import {AuthRoute} from './components/AuthRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
           {/* 需要鉴权的路由 */}
          <Route path='/*' element= {<AuthRoute><Layout/></AuthRoute>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>    
    </BrowserRouter>

  );
}

export default App;
