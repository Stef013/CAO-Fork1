import Login from './pages/LoginPage';
import FlightTracker from './pages/FlightTracker'
import Booking from './pages/BookingMain';
import Error from './pages/Error';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/FlightTracker" component={FlightTracker} />
        <Route path="/Booking" component={Booking} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
