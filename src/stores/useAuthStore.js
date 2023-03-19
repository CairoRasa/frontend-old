import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set, get) => ({
  token: Cookies.get('token') || null,
  isLoggedIn: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${get().token}`,
      }
    })
    return res.status === 200;
  },
  getToken: () => {
    return get().token
  },
  currentUser: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
    return res.json();
  },
  login: async (username, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/jwt/login`, {
      method: 'POST',
      body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
    });
    const { access_token } = await response.json();
    set({ access_token });
    Cookies.set('token', access_token);
    return access_token;
  },
  logout: () => {
    set({ token: null });
    Cookies.remove('token');
  },
}));

export default useAuthStore;
