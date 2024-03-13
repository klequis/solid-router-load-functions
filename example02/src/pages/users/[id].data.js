import { cache } from "@solidjs/router";

export const getUser = cache(async (id) => {
  return (await fetch(`https://swapi.tech/api/people/${id}/`)).json();
}, "getUser");

export function loadUser({ params, location, intent }) {
  console.log('params', params)
  console.log('loction', location)
  console.log('intent', intent)
  return getUser(params.id);
}
