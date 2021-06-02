import "./App.css";
import HomePage from "./components/HomePage";
import StudentDirectory from "./components/StudentDirectory";
import { Route, Switch } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import ClassDashboard from "./components/ClassDashboard";
import CalendarPage from "./components/CalendarPage";
import ClassPage from './components/ClassPage';
import firebase from "./firebase/firebase";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import LoginPage from "./components/LoginPage";

function App() {
  const { setUser } = useContext(UserContext);
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/student-directory" component={StudentDirectory} />
        <Route path="/class-dashboard" component={ClassDashboard} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/class-page/:id" component={ClassPage}/>
        <Route path="/Login" component={LoginPage} />
        <Route component={ErrorComponent} />
      </Switch>

    </div>
  );
}

export default App;
