import { useEffect, useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { Link } from "react-router-dom";

export default function NavBar() {
  const authStore = useAuthStore();
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    authStore.currentUser().then((res) => setUser(res));
  }, [])

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            {(user && user.detail !== "Unauthorized") ? <li className="overflow-hidden"><a>Welcome {user.name}</a></li> : <li><a href="/login">Login</a></li>}
            <li><a>About</a></li>
          </ul>
        </div>
        <div className="flex-1">
          <Link to="/" className="text-xl normal-case btn btn-ghost">CairoRasa</Link>
        </div>
      </div>
      <div className="flex-none">
      </div>
    </div>
  );
}
