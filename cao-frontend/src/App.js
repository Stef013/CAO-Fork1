import Login from './pages/LoginPage';
import FlightTracker from './pages/FlightTracker'
import BookingPassenger from './pages/BookingPassengers';
import BookingOverview from './pages/BookingOverview';
import BookingSeatpicker from './pages/BookingSeatpicker';
import Error from './pages/Error';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/FlightTracker" component={FlightTracker} />
        <Route path="/Bookingpassengers" component={BookingPassenger} />
        <Route path="/Bookingoverview" component={BookingOverview} />
        <Route path="/Bookingseatpicker" component={BookingSeatpicker} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
