import React, { useState } from 'react';
import Login from './pages/LoginPage';
import FlightTracker from './pages/FlightTracker';
import EmployeePortal from './pages/Management/EmployeePortal';
import EmployeeCreation from './pages/Management/EmployeeCreation';
import EmployeeList from './pages/Management/EmployeeList';
import Error from './pages/Error';
import { Redirect, Route, Switch } from 'react-router-dom';
import FlightSummary from "./pages/FlightSummary";
import FlightPlanner from "./pages/FlightPlanner";
import Booking from "./pages/BookingMain";
import { Suspense } from "react";

function App() {
  const [token, setToken] = useState();

  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        {
          !token ?
            <Login setToken={setToken} /> :
            <Switch>
              // TODO: check if user has employee rights, redirect accordingly
              <Redirect from='/' to="/EmployeePortal/" />
              <Route path="/FlightTracker" component={FlightTracker} />
              <Route path="/EmployeePortal" component={EmployeePortal} />
              <Route path="/EmployeeCreation" component={EmployeeCreation} />
              <Route path="/EmployeeList" component={EmployeeList} />
              <Route path="/FlightSummary" component={FlightSummary} />
              <Route path="/FlightPlanner" component={FlightPlanner} />
              <Route path="/Booking" component={Booking} />
              <Route component={Error} />
            </Switch>
        }

      </Suspense>
    </main>
  );
}

export default App;
