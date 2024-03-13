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