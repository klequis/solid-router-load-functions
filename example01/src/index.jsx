/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, createAsync } from "@solidjs/router";
import { cache } from "@solidjs/router";
import { A } from "@solidjs/router"

const getUser = cache(async (id) => {
  return (await fetch(`https://swapi.tech/api/people/${id}/`)).json()
}, "getUser")

function loadUser({ params, location }) {
  void getUser(params.id)
}

render(() => (
  <Router>
    <Route path="/" component={Home} />
    <Route
      path="/user/:id"
      component={User}
      load={loadUser}
    />
  </Router>
), document.getElementById("root"));

function User(props) {
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

export default function Home() {
  return (
    <>
      <A href="/user/1">/user/1</A>
      <h1>Home</h1>
    </>
  )
}