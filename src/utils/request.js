import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {
  const raw = response[1];
  const resolved = response[0];  // 请求接口返回的数据
  if (raw.status >= 200 && raw.status < 300) {
    return resolved;
  } else {
    throw new Error(resolved.error ? resolved.error.message : resolved.message);
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function generateUrl(url) {
  return `http://0.0.0.0:3001/api/${url}`;
}
function toJson(raw) {
  const resolved = parseJSON(raw);
  return Promise.all([resolved, raw]);
}
function genreateRequest(url, options) {
  return fetch(generateUrl(url), options)
    .then(toJson)
    .then(checkStatus);
}
function genrateRequestHeader(method) {
  const header = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // try {
  //   const auth = JSON.parse(document.defaultView.localStorage.getItem('auth'));
  //   Object.assign(header.headers, {
  //     Authorization: `Bearer ${auth.accessToken}`,
  //   });
  // } catch (e) {
  //   return header;
  // }
  return header;
}
const Request = {
  post(url, data) {
    const body = JSON.stringify(data);
    return genreateRequest(url, { ...genrateRequestHeader('POST'), body });
  },
  patch(url, data) {
    const body = JSON.stringify(data);
    return genreateRequest(url, { ...genrateRequestHeader('PATCH'), body });
  },
  put(url, data) {
    const body = JSON.stringify(data);
    return genreateRequest(url, { ...genrateRequestHeader('put'), body });
  },
  get(url) {
    return genreateRequest(url, { ...genrateRequestHeader('GET') });
  },
  delete(url) {
    return genreateRequest(url, { ...genrateRequestHeader('DELETE') });
  },
};

export default Request;