import Login from "./pages/LoginPage";
import FlightTracker from "./pages/FlightTracker";
import EmployeeLogin from "./pages/Management/EmployeeLogin";
import EmployeePortal from "./pages/Management/EmployeePortal";
import EmployeeCreation from "./pages/Management/EmployeeCreation";
import FlightSummary from "./pages/FlightSummary";
import FlightPlanner from "./pages/FlightPlanner";
import Error from "./pages/Error";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/FlightTracker" component={FlightTracker} />
        <Route path="/EmployeeLogin" component={EmployeeLogin} />
        <Route path="/EmployeePortal" component={EmployeePortal} />
        <Route path="/EmployeeCreation" component={EmployeeCreation} />
        <Route path="/FlightSummary" component={FlightSummary} />
        <Route path="/FlightPlanner" component={FlightPlanner} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
