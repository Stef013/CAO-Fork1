import React, { useState } from 'react';
import Login from './pages/LoginPage';
import FlightTracker from './pages/FlightTracker';
import EmployeePortal from './pages/Management/EmployeePortal';
import EmployeeCreation from './pages/Management/EmployeeCreation';
import EmployeeList from './pages/Management/EmployeeList';
import Error from './pages/Error';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <Login setToken={setToken} />
    );
  }

  return (
    <main>
      <Switch>
        // TODO: check if user has employee rights, redirect accordingly
        <Redirect from='/' to="/EmployeePortal/" />
        <Route path="/FlightTracker" component={FlightTracker} />
        <Route path="/EmployeePortal" component={EmployeePortal} />
        <Route path="/EmployeeCreation" component={EmployeeCreation} />
        <Route path="/EmployeeList" component={EmployeeList} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
