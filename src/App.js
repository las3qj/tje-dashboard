import "./App.css";
import HomePage from "./components/HomePage";
import { Route, Switch } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import CalendarPage from "./components/CalendarPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/calendar" component={CalendarPage} />
        <Route component={ErrorComponent} />
      </Switch>
    </div>
  );
}

export default App;
