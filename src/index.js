import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css'
import './index.scss';
import App from './App';
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

	<ConfigProvider 
        theme={{ 
            token: { 
              colorPrimary: "#A0D911"
            }
        }}    
    >
    <App />
  </ConfigProvider>
);
