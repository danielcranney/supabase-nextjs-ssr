import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Auth(props) {
  const { supabaseClient, authView, setAuthView } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabaseClient.auth.signIn({
      email,
      password,
    });
    if (signInError) setError(signInError.message);

    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signUpError } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    if (signUpError) setError(signUpError.message);

    setLoading(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email
    );
    if (error) setError(error.message);
    else setMessage("Check your email for the password reset link");
    setLoading(false);
  };

  const handleMagicLinkSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn({ email });
    if (error) setError(error.message);
    else setMessage("Check your email for the magic link");
    setLoading(false);
  };

  return (
    <>
      {loading && <h3>Loading..</h3>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      {authView === "sign_in" ? (
        <div className="flex flex-col">
          <h4 className="mb-3 text-center">Sign In</h4>
          <form
            onSubmit={(e) => handleSignIn(e)}
            className="flex flex-col mb-4"
          >
            <label htmlFor="sign-in__email" className="mb-2 font-semibold">
              Email
            </label>
            <input
              id="sign-in__email"
              label="Email address"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <label htmlFor="sign-in__password" className="mb-2 font-semibold">
              Password
            </label>
            <input
              id="sign-in__password"
              label="Password"
              type="password"
              defaultValue={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <button type="submit" className="btn-gray-outline btn-md">
              Sign In
            </button>
          </form>

          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setAuthView("sign_up")}
              className="font-semibold text-gray-400 transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-gray-600"
            >
              Don't have an account? Sign up
            </button>
            <button
              onClick={() => setAuthView("forgotten_password")}
              className="font-semibold text-gray-400 transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-gray-600"
            >
              Forgot my password
            </button>
          </div>
          {/* <a onClick={() => setAuthView("magic_link")}>Send magic link email</a> */}
        </div>
      ) : authView === "sign_up" ? (
        <div className="flex flex-col">
          <h4 className="mb-3 text-center">Sign Up</h4>
          <form
            onSubmit={(e) => handleSignUp(e)}
            className="flex flex-col mb-4"
          >
            <label htmlFor="sign-up__email" className="mb-2 font-semibold">
              Email
            </label>
            <input
              id="sign-up__email"
              label="Email address"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <label htmlFor="sign-up__password" className="mb-2 font-semibold">
              Password
            </label>
            <input
              id="sign-up__password"
              label="Password"
              type="password"
              defaultValue={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <button type="submit" className="btn-gray-outline btn-md">
              Sign Up
            </button>
          </form>

          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setAuthView("sign_in")}
              className="font-semibold text-gray-400 transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-gray-600"
            >
              Already have an account, Sign in
            </button>
            <button
              onClick={() => setAuthView("forgotten_password")}
              className="font-semibold text-gray-400 transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-gray-600"
            >
              Forgot my password
            </button>
          </div>

          {/* <a onClick={() => setAuthView("magic_link")}>Send magic link email</a> */}
        </div>
      ) : authView === "forgotten_password" ? (
        <div className="flex flex-col">
          <h4 className="mb-3 text-center">Forgotten Password</h4>
          <form onSubmit={handlePasswordReset} className="flex flex-col mb-4">
            <label
              htmlFor="forgotten_password__email"
              className="mb-2 font-semibold"
            >
              Email
            </label>
            <input
              id="forgotten_password__email"
              label="Email address"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <button type="submit" className="btn-gray-outline btn-md">
              Send reset password instructions
            </button>
          </form>
          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setAuthView("sign_up")}
              className="font-semibold text-gray-400 transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-gray-600"
            >
              Don't have an account? Sign up
            </button>
            <button
              onClick={() => setAuthView("sign_in")}
              className="font-semibold text-gray-400 transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-gray-600"
            >
              Already have an account, Sign in
            </button>
          </div>
          {/* <a onClick={() => setAuthView("magic_link")}>Send magic link email</a> */}
        </div>
      ) : authView === "magic_link" ? (
        <>
          <h4>Magic link</h4>
          <form onSubmit={handleMagicLinkSignIn}>
            <input
              label="Email address"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send magic link</button>
          </form>
          <hr />
          <a onClick={() => setAuthView("sign_up")}>
            Don't have an account? Sign up
          </a>
          <a onClick={() => setAuthView("sign_in")}>
            Already have an account, Sign in
          </a>
        </>
      ) : null}
    </>
  );
}

function UpdatePassword({ supabaseClient }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.update({ password });
    if (error) setError(error.message);
    else setMessage("Your password has been updated");
    setLoading(false);
  };

  return (
    <>
      {loading && <h4>Loading..</h4>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      <h4>Set a new password</h4>
      <form onSubmit={handlePasswordReset}>
        <input
          label="New password"
          placeholder="Enter your new password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button block size="large" htmlType="submit">
          Update password
        </button>
      </form>
    </>
  );
}

Auth.UpdatePassword = UpdatePassword;
export default Auth;
