import getRequestUrl from "./get-request-url.jsx";

export default async function getRandomVideo() {
  const res = await fetch(getRequestUrl("/random-video"));
  return await res.text();
}
