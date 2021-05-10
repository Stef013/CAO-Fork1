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
import jwt_decode from "jwt-decode";
import MenuAppBar from './Components/MenuAppBar';

function App() {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return null;
    }
    const decoded = jwt_decode(token);
    const now = new Date().getTime();
    return decoded.nbf * 1000 > now || decoded.exp * 1000 < now ? null : localStorage.getItem('accessToken');
  });
  React.useEffect(() => {
    token ? localStorage.setItem('accessToken', token) : localStorage.removeItem('accessToken');
  }, [token]);

  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <MenuAppBar auth={!!token} setToken={setToken} />
        {
          !token ?
            <Login setToken={setToken} /> :
            <Switch>
              <Route path="/FlightTracker" component={FlightTracker} />
              <Route path="/EmployeePortal" component={EmployeePortal} />
              <Route path="/EmployeeCreation" component={EmployeeCreation} />
              <Route path="/EmployeeList" component={EmployeeList} />
              <Route path="/FlightSummary" component={FlightSummary} />
              <Route path="/FlightPlanner" component={FlightPlanner} />
              <Route path="/Booking" component={Booking} />

              {/* TODO: check if user has employee rights, redirect accordingly */}
              <Redirect from='/' to="/EmployeePortal" />
              <Route component={Error} />
            </Switch>
        }
      </Suspense>
    </main>
  );
}

export default App;
