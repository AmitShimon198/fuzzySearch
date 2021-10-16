import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import NavBar from './components/navBar/Navbar';
import DiagnosisForm from './components/diagnosis/DiagnosisForm';
import BloodTestContextProvider from './store/bloodTestResultContext';
import DisplayTestResults from './components/displayResults/DisplayTestResults';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar logo='My Clinic' />
        <BloodTestContextProvider>
          <Switch>
            <Route exact path="/">
              <DiagnosisForm />
            </Route>
            <Route path="/results">
              <DisplayTestResults />
            </Route>
          </Switch>
        </BloodTestContextProvider>
      </div>
    </Router>
  );
}

export default App;
