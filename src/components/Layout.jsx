import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <Outlet />
      <Footer className="h-10" />
    </div>
  );
}
