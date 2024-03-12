/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { loadUser } from "./pages/users/[id]";

const Home = lazy(() => import('./pages/Home'))
const User = lazy(() => import('./pages/users/[id]'))

render(() => (
  <Router>
    <Route path="/" component={Home} />
    <Route
      path="/users/:id"
      component={User}
      load={loadUser}
    />
  </Router>
), document.getElementById("root"));



