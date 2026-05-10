import { setError, setUser, setLoading } from "../state/auth.slice";
import { getMe, login, register, logout } from "../service/auth.api";
import { useDispatch } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();

  async function withDispatch(asyncFn, fallbackMessage) {
    try {
      dispatch(setLoading(true));
      return await asyncFn();
    } catch (error) {
      dispatch(setError(error.response?.data?.message || fallbackMessage));
      throw error; // re-throw so Login.jsx catch block can also handle it
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleRegister({ fullname, email, password, contact }) {
    return await withDispatch(async () => {
      const data = await register({ fullname, email, password, contact });
      dispatch(setUser(data.user));
      return data.user;
    }, "Registration failed");
  }

  async function handleLogin({ identifier, password }) {
    return await withDispatch(async () => {
      const data = await login({ identifier, password });
      dispatch(setUser(data.user));
      return data.user;
    }, "Login failed");
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      // eslint-disable-next-line
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    await logout();
    dispatch(setUser(null));
  }

  return { handleGetMe, handleLogin, handleRegister, handleLogout };
}
