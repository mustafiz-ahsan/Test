import React from 'react';
import UserManagement from './components/UserManagement';
import OrderBookingManagement from './components/OrderBookingManagement';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user-management" component={UserManagement} />
        <Route path="/order-booking" component={OrderBookingManagement} />
      </Switch>
    </Router>
  );
}

export default App;