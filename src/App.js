import { Route, Routes } from 'react-router-dom';
import {AuthRoute} from './components/AuthRoute';
import './App.css'
import { HistoryRouter, history } from './utils/history';
import { lazy, Suspense } from 'react';
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App() {
  return (
    <HistoryRouter history={history}>
      <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
      >
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
      </Suspense>
    </HistoryRouter>


  );
}

export default App;
