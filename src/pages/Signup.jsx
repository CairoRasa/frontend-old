import { useState } from "react";
import Alert from "../components/Alert";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);

  function onInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.password_confirm) {
      setAlert("Passwords do not match");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setAlert("SignUp Successful");
      } else {
        response.json().then((data) => setAlert("SignUp Failed\n" + data.detail));
        // setAlert("SignUp Failed\n" + data.detail);
      }
    })
  }

  return (
    <div className="flex justify-center gap-5 lg:flex-row flex-col mt-4">
      <div className="mr-3 ml-3">
        <h1 className="text-4xl mb-2">Sign Up</h1>
        <div className="mt-3">{alert && <Alert text={alert} />}</div>
        <form onSubmit={onSubmit} className="form-control">
        <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <label className="input-group">
              <span className="text-black font-semibold bg-primary">Name</span>
              <input
                type="text"
                placeholder="John Doe"
                required
                name="name"
                className="input input-bordered w-full"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <label className="input-group">
              <span className="text-black font-semibold bg-primary">Email</span>
              <input
                type="text"
                placeholder="info@site.com"
                required
                name="email"
                className="input input-bordered w-full"
                onChange={onInputChange}
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
                type="password"
                required
                name="password"
                placeholder="your password here"
                className="input input-bordered w-full"
                onChange={onInputChange}
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <label className="input-group">
              <span className="text-black font-semibold bg-primary">
                Password
              </span>
              <input
                type="password"
                required
                name="password_confirm"
                placeholder="type same password again"
                className="input input-bordered w-full"
                onChange={onInputChange}
              />
            </label>
          </div>
          <button className="btn mt-4 btn-primary" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
