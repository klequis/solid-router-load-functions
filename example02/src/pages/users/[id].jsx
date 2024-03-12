import { createAsync } from "@solidjs/router";

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