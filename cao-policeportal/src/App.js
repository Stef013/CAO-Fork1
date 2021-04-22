import logo from './logo.svg';
import Login from './pages/LoginPage'
import Portal from './pages/Portal'
import PoliceReport from './pages/PoliceReport'
import './App.css';
import { Route, Switch } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/portal" component={Portal} />
          <Route path="/policereport" component={PoliceReport} />
          <Route component={Error} />
        </Switch>
      </Suspense>
    </main>
  );
}

export default App;
