function getRequestUrl(path = "/", serach = {}) {
  const url = new URL(apiUrl + path);

  Object.keys(serach).forEach((key) => {
    url.searchParams.set(key, serach[key]);
  });

  return url.toString();
}

export default getRequestUrl;