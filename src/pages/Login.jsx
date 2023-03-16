import Alert from '../components/Alert';
import { useState } from 'react';
import useAuthStore from '../stores/useAuthStore';

export default function Login() {
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
    const response = await authStore.login(formData.email, formData.password);
    if (response) {
      setAlert("Login Successful");
    }
    setAlert("Login Failed");    
    console.log(response);
    console.log(formData);
    authStore.isLoggedIn().then((res) =>  setAlert("Login Successful") );
  }

  return (
    <>
      {alert && <Alert text={alert} />}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          className="gap-5 lg:flex-row flex-col mt-4"
        >
          <div className="mr-3 ml-3">
            <h1 className="text-4xl mb-2">Sign In</h1>
            <form onSubmit={onSubmit} className="form-control">
              <div>
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <label className="input-group">
                  <span className="text-black font-semibold bg-primary">
                    Email
                  </span>
                  <input
                    type="text"
                    required
                    name="email"
                    placeholder="info@site.com"
                    onChange={onInputChange}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Your Password</span>
                </label>
                <label className="input-group">
                  <span className="text-black font-semibold bg-primary">
                    Password
                  </span>
                  <input
                    name="password"
                    type="password"
                    required
                    onChange={onInputChange}
                    placeholder="your password here"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              {/* {ApiResp && <p>{ApiResp}</p>} */}
              <button
                style={{
                  marginTop: '15px',
                  marginBottom: '20px',
                }}
                className="btn btn-primary"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
