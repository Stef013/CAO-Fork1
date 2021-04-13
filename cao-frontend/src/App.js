import Login from './pages/LoginPage';
import FlightTracker from './pages/FlightTracker'
import EmployeeLogin from './pages/Management/EmployeeLogin'
import EmployeePortal from './pages/Management/EmployeePortal'
import EmployeeCreation from './pages/Management/EmployeeCreation'
import EmployeeList from './pages/Management/EmployeeList'
import Error from './pages/Error'
import Booking from './pages/BookingMain';
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/FlightTracker" component={FlightTracker} />
        <Route path="/EmployeeLogin" component={EmployeeLogin} />
        <Route path="/EmployeePortal" component={EmployeePortal} />
        <Route path="/EmployeeCreation" component={EmployeeCreation} />
        <Route path="/EmployeeList" component={EmployeeList} />
        <Route path="/Booking" component={Booking} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
