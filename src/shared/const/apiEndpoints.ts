const API_URL = process.env.API_URL;

export const API_ENDPOINTS = {
  Auth: `${API_URL}/users`,
  Register: `${API_URL}/users/register`,
  Login: `${API_URL}/users/login`,
  Projects: `${API_URL}/projects`,
  Permissions: `${API_URL}/permissions`,
};
