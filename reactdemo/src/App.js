import './App.css';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import router_map from './router/index'

function App() {
  return (
    <Router>
        <ul>
          {
            router_map.routes.map((item) => {
              return <li>
                <Link to={item.path}>{item.path_name}</Link>
              </li>
            })
          }
        </ul>
        {
          router_map.routes.map((item) => {
            return <Route path={item.path} component={item.component}/>
          })
        }
    </Router>
  );
}

export default App;
