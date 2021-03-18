import Login from './pages/LoginPage'
import FlightTracker from './pages/FlightTracker'
import Error from './pages/Error'
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/FlightTracker" component={FlightTracker} />
          <Route component={Error} />
        </Switch>
      </Suspense>
    </main>
  );
}

export default App;
