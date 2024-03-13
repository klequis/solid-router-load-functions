## Load Functions

Even with smart caches, we may have waterfalls with both view logic and lazy-loaded code. With load functions, data fetching is started parallel to loading the route, so it can be used as soon as possible. The load function is called when the Route is loaded, or eagerly when links are hovered.

As its only argument, the load function is passed an object that you can use to access route information:

```jsx
import { lazy } from "solid-js";
import { Route } from "@solidjs/router";

const User = lazy(() => import("./pages/users/[id].js"));

// load function
function loadUser({params, location}) {
  // do loading
}
```

The load function is then passed in the `<Route>` definition

```jsx
<Route path="/users/:id" component={User} load={loadUser} />;
```

A common pattern is to export the load function and data wrappers that correspond to a route from a dedicated route.data.js file. This way, the data function can be imported without loading anything else.

```jsx
// src/pages/users/[id].data.js
import { cache } from "@solidjs/router";

export const getUser = cache(async (id) => {
  return (await fetch(`https://swapi.tech/api/people/${id}/`)).json();
}, "getUser");

export function loadUser({ params, location, intent }) {
  return getUser(params.id);
}
```

`loadUser` is passed an object which contains `params`, `location` and `intent`.
Here we are only using `params`. The return value of the load function is passed to the page component when called at any time other than "preload", so you can initialize things in there, or use our new [Data APIs](/reference/solid-router/data-apis/create-async). See [Load](/reference/solid-router/load-functions/load) details.

Using `cache` has several benefits including preventing duplicate fetching. See [cache](https://docs.solidjs.com/reference/solid-router/data-apis/cache) for details.

`[id]` in `[id].data.js` is a convention and not required.

<div style="background-color: darkorange; padding: 5px; color: white">
Yes, it appears that the results of `getUser` is returned to `loadUser` which returns to the `load` property.
</div>

<div style="background-color: darkorange; padding: 5px; color: white">
The above link is in create-async. In the actual doc you cannot navigate to to "Data API's" but try this link when the doc is hosted to see what happens: [Data APIs](/reference/solid-router/data-apis/)
</div>

`loadUser` is called from the `<Route>`

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

`[id].jsx` contains the component that gets rendered.

```jsx
// [id].jsx
import { createAsync } from "@solidjs/router";
import { getUser } from "./[id].data";

export default function Users(props) {
  console.log('Users.props', props)
  const user = createAsync(() => getUser(props.params.id));
  return (
    <>
      <h1>User</h1>
      <div>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </>
  )
}
```

[`createAsync`](/reference/solid-router/data-apis/create-async) expects a promise and turns it into a [Signal](/routes/concepts/signals)
