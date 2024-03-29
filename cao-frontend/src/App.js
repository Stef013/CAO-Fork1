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
import CreateBookingMain from "./pages/CreateBookingMain";
import BookingListPage from "./pages/BookingListPage";
import { Suspense } from "react";
import jwt_decode from "jwt-decode";
import MenuAppBar from './Components/MenuAppBar';
import MenuAppBarEmployee from './Components/MenuAppBarEmployee';
import AppBarLogin from './Components/AppBarLogin';
import axios from 'axios';
import CustomerFlightList from "./Components/CustomerFlightList"
import { withRouter } from 'react-router-dom';


function App() {
  const authAxios = axios.create({
    baseURL: 'http://20.82.46.255',
  });

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

  if (token) {
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  else {
    delete axios.defaults.headers.common['Authorization'];
  }

  const [accountType, setAccountType] = useState();

  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>

        {!token ? (
          <div>
            <AppBarLogin />
            <Login setToken={setToken} setAccountType={setAccountType} axios={authAxios} />
          </div>
        )
          :
          (
            <div>
              <div>
                {accountType ? (
                  <div>
                    <MenuAppBar auth={!!token} setToken={setToken} />

                  </div>
                )
                  :
                  (
                    <div>
                      <MenuAppBarEmployee auth={!!token} setToken={setToken} />
                    </div>
                  )}
              </div>

              <Switch>
                <Route path="/FlightTracker" component={FlightTracker} />
                <Route path="/EmployeePortal" component={EmployeePortal} />
                <Route path="/EmployeeCreation" component={() => <EmployeeCreation axios={authAxios} />} />
                <Route path="/EmployeeList" component={() => <EmployeeList axios={authAxios} />} />
                <Route path="/FlightSummary" component={() => <FlightSummary axios={authAxios} />} />
                <Route path="/FlightPlanner" component={FlightPlanner} />
                <Route path="/CreateBooking" component={() => <CreateBookingMain axios={authAxios} render={(props) => <CreateBookingMain {...props} />} />} />
                <Route path="/BookingList" component={() => <BookingListPage axios={authAxios} />} />
                <Route path="/FlightList" component={() => <CustomerFlightList axios={authAxios} />} />

                {/* TODO: check if user has employee rights, redirect accordingly */}
                <Redirect from='/' to="/EmployeePortal" />
                <Route component={Error} />
              </Switch>

            </div>

          )

        }
      </Suspense>
    </main >
  );
}

export default withRouter(App);
