import './App.css';
import HomePage from "./components/HomePage"
import StudentDirectory from "./components/StudentDirectory"
import { Route, Switch } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent"
import ClassDashboard from './components/ClassDashboard';
import CalendarPage from "./components/CalendarPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path='/student-directory' component={StudentDirectory} />
        <Route path='/class-dashboard' component={ClassDashboard} />
        <Route path="/calendar" component={CalendarPage} />
        <Route component={ErrorComponent} />
      </Switch>
    </div>
  );
}

export default App;
