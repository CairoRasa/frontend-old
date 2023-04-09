import {useState} from "react";
import Alert from "../components/Alert";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [alertBox, setAlertBox] = useState(null);
    const [showTokenBox, setShowTokenBox] = useState(false)

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
            setAlertBox("Passwords do not match");
            return;
        }
        setAlertBox("Registering you... do not refresh or close the window...")
        fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then(async (response) => {
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                setAlertBox("SignUp Successful.. Please wait while we sent you a token for account verification");
                const ReqVerifyRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/request-verify-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email
                    })
                })
                if (ReqVerifyRes.ok) {
                    setShowTokenBox(true)
                    setAlertBox("Email sent, check your mailbox and paste the token you found, here.")
                } else {
                    setAlertBox("Failed to send email for verification")
                }
            } else {
                response.json().then((data) => setAlertBox("SignUp Failed\n" + data.detail));
                // setAlert("SignUp Failed\n" + data.detail);
            }
        })

    }

    return (
        <div className="flex justify-center gap-5 lg:flex-row flex-col mt-4">
            <div className="mr-3 ml-3">
                <h1 className="text-4xl mb-2">Sign Up</h1>
                <div className="mt-3">{alertBox && <Alert text={alertBox}/>}</div>
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
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(e)
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: e.target[0].value
                        })
                    })
                    if (res.statusText === "OK") {
                        setAlertBox("Your account has been verified")
                    }
                }} hidden={!showTokenBox} className="mt-4">
                    <input
                        type="password"
                        required
                        className="input input-bordered w-full"
                        name="Verify Token"
                        placeholder="Token sent to the email for verification"
                    />
                    <button className="btn mt-4 btn-primary" type="submit">
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
}
