import { cache } from "@solidjs/router";

export const getUser = cache(async (id) => {
  return (await fetch(`https://swapi.tech/api/people/${id}/`)).json();
}, "getUser");

export function loadUser({ params, location }) {
  return getUser(params.id);
}
