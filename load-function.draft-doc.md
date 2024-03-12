## Load Functions

Even with smart caches, we may have waterfalls both with view logic and with lazy loaded code. With load functions, we can instead start fetching the data parallel to loading the route, so we can use the data as soon as possible. The load function is called when the Route is loaded or eagerly when links are hovered.

As its only argument, the load function is passed an object that you can use to access route information:

```jsx
import { lazy } from "solid-js";
import { Route } from "@solidjs/router";

const User = lazy(() => import("./pages/users/[id].js"));

// load function
function loadUser({params, location}) {
  // do loading
}

// Pass it in the route definition
<Route path="/users/:id" component={User} load={loadUser} />;
```

A common pattern is to export the load function and data wrappers that correspond to a route in a dedicated route.data.js file. This way, the data function can be imported without loading anything else.

```jsx
// src/pages/users/[id].data.js
import { cache } from "@solidjs/router";

export const getUser = cache(async (id) => {
  return (await fetch(`https://swapi.tech/api/people/${id}/`)).json();
}, "getUser");

export function loadUser({ params, location }) {
  void getUser(params.id);
}
```



The return value of the load function is passed to the page component when called at anytime other than "preload", so you can initialize things in there, or use our new Data APIs

<div style="background-color: darkorange; padding: 5px; color: white">
Insert link to "Data APIs" section of this doc.
</div>

`loadUser` is called from the <Route>

```jsx
// src/index.jsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { loadUser } from "./pages/users/[id].data.js";

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
```