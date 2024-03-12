import { cache } from "@solidjs/router"
import { createAsync } from "@solidjs/router";

export const getUser = cache(async (id) => {
  return (await fetch(`https://swapi.tech/api/people/${id}/`)).json()
}, "getUser")

export function loadUser({ params, location }) {
  void getUser(params.id)
}

export default function Users(props) {
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