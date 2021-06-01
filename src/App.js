import logo from './logo.svg';
import './App.css';
import HomePage from "./components/HomePage"
import { Route, Switch } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route component={ErrorComponent} />
      </Switch>
    </div>
  );
}

export default App;
