import { useState } from 'react';
import './Hero.css';
import useAuthStore from '../stores/useAuthStore';
import Alert from './Alert';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);
  const authStore = useAuthStore();

  function onInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    if (formData.email == null || formData.password == null) {
      setAlert("Please fill in all fields");
      return;
    }

    const response = await authStore.login(formData.email, formData.password);
    if (response) {
      setAlert("Login Successful");
    }
    setAlert("Login Failed");    
    console.log(response);
    console.log(formData);
    authStore.isLoggedIn().then((res) =>  {
      // console.log(res)
      if (res === true) {
        // console.log(res == true)
        setAlert("Login Successful")
      } else {
        setAlert("Login Failed")
      }
    } );
  }

  return (
    <div
      className="hero bg-base-200"
      style={{
        backgroundImage: "url('home-bg.png')",
      }}
    >
      <div className="flex-col hero-content lg:flex-row-reverse ">
        <div className="z-0 text-center lg:text-left">
          <h1 className="text-5xl font-bold img_text">
            The ultimate destination for lovers of Indonesian cuisine in Egypt!
          </h1>
          <p className="py-6 img_text">
            At CairoRasa, we believe that food is more than just sustenance.
            It's a way to connect with people, culture, and history. That's why
            we're dedicated to delivering authentic Indonesian dishes that
            capture the essence of this rich and vibrant culinary tradition.
          </p>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
          <div className="card-body">
          {alert && <Alert text={alert} />}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                required
                name='email'
                onChange={onInputChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                required
                name='password'
                onChange={onInputChange}
                className="input input-bordered"
              />
              <label className="label">
                <Link to="#" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
                <Link to="/signup" className="label-text-alt link link-hover">
                  New here? Sign Up
                </Link>
              </label>
            </div>
            <div className="mt-6 form-control">
              <button onClick={onSubmit} className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
