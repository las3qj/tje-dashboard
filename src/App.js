import logo from './logo.svg';
import './App.css';
import HomePage from "./components/HomePage"
import StudentDirectory from "./components/StudentDirectory"
import { Route, Switch } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent"
import ClassDashboard from './components/ClassDashboard';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path='/student-directory' component={StudentDirectory} />
        <Route path='/class-dashboard' component={ClassDashboard} />
        <Route component={ErrorComponent} />
      </Switch>
    </div>
  );
}

export default App;
