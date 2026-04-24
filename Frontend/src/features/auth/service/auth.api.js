import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({
  fullname,
  email,
  password,
  contact,
  isSeller
}) {
  const response = await authApiInstance.post("/api/auth/register", {
    fullname,
    email,
    password,
    contact,
    isSeller,
  });
  return response.data;
}

export async function login({ identifier, password }) {
  const response = await authApiInstance.post("/api/auth/login", {
    identifier,
    password,
  });
  return response.data;
}

export async function getMe() {
  const response = await authApiInstance.get("api/auth/get-me");
  return response.data;
}

export async function logout() {
  const response = await authApiInstance.post("/api/auth/logout");
  return response.data;
}
