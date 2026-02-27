const BASE_URL = "http://localhost:3000";

const request = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {} } = options;

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw { status: response.status, message: error.message || response.statusText };
  }

  return response.json();
};

const api = {
  get: (endpoint, headers) => request(endpoint, { method: "GET", headers }),
  post: (endpoint, body, headers) => request(endpoint, { method: "POST", body, headers }),
  put: (endpoint, body, headers) => request(endpoint, { method: "PUT", body, headers }),
  patch: (endpoint, body, headers) => request(endpoint, { method: "PATCH", body, headers }),
  delete: (endpoint, headers) => request(endpoint, { method: "DELETE", headers }),
};

export default api;
