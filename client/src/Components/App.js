import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Data from "./Data/Data";
import Payment from "./Payment/Payment";
import SelectField from "./SelectField/SelectField";
import EditField from "./EditField/EditField";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";

import "bulma/css/bulma.css";
import "./App.scss";

function App({ refetch, session }) {
  return (
    <React.Fragment>
      <Switch>
        {session && session.getCurrentUser ? (
          <Route path="/" exact component={Dashboard} />
        ) : (
          <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        )}
        <Route path="/data" component={Data} />
        <Route
          path="/select-field"
          render={() => <SelectField session={session} refetch={refetch} />}
        />
        <Route
          path="/settings"
          render={() => <EditField session={session} refetch={refetch} />}
        />
        <Route path="/payment" component={Payment} />

        <Route path="/signup" render={() => <Signup refetch={refetch} />} />

        {session && session.getCurrentUser ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/signin" />
        )}
      </Switch>
    </React.Fragment>
  );
}

export default inject("mapStore")(withRouter(observer(App)));
