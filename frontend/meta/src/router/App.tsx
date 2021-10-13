import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Home, Login, Profile, Register, ProfileUpdate } from "../screens/index";

export default () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={`/profile/:id/update`}>
            <ProfileUpdate />
          </Route>
          <Route exact path={`/profile/:id`}>
            <Profile />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
