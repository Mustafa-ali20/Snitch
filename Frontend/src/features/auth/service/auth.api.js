import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export async function register({ fullname, email, password, contact }) {
  const response = await authApiInstance.post("/register", {
    fullname,
    email,
    password,
    contact,
  });
  return response.data;
}

export async function login({ identifier, password }) {
  const response = await authApiInstance.post("/login", {
    identifier,
    password,
  });
  return response.data;
}

export async function getMe() {
  const response = await authApiInstance.get("/get-me");
  return response.data;
}

export async function logout() {
  const response = await authApiInstance.post("/logout");
  return response.data;
}
