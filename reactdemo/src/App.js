import './App.css';
import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import router_map from './router/index'
import { Menu } from 'antd';


function App() {

  const [current,setCurrent] = useState(router_map.routes[0].path);

  let handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Router>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {
          router_map.routes.map((item) => {
            return <Menu.Item key={item.path}>
              <Link to={item.path}>{item.path_name}</Link>
            </Menu.Item>
          })
      }
    </Menu>
      {
        router_map.routes.map((item) => {
          return <Route path={item.path} component={item.component} key={item.path}/>
        })
      }
    </Router>
  );
}

export default App;
