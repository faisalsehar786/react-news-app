import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Setting from './components/Setting';
require('dotenv').config()
function App() {
  return (
    <>
      
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/setting">
                <Setting />
              </Route>
            </Switch>
          </div>
        </Router>
     
    </>
  );
}

export default App;
