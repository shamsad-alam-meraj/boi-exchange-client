import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useToken(gUser || user);
  let from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (error || gError) {
    signInError = (
      <p className="text-red-600 pb-2">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }
  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-gray-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold font-serif">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email field  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-serif">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required.",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a Valid Email Address.",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs font-serif"
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-600 font-serif">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-600 font-serif">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            {/* Password Field  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-serif">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required.",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character or more longer.",
                  },
                })}
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs font-serif"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-600 font-serif">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-600 font-serif">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {/* Error  */}
            {signInError}
            {/* Login Button  */}
            <h1 className="text-center mt-0 mb-2 font-serif text-xs ">
              Forgot Password?
              <Link
                to="/forgotPassword"
                className="ml-1 text-yellow-600 font-bold cursor-pointer"
              >
                Reset
              </Link>
            </h1>
            <input
              className="btn btn-active btn-success text-white font-bold w-full max-w-xs hover:bg-white hover:text-success border-2 font-serif normal-case"
              type="submit"
              value="Log In"
            />
          </form>

          <p className="text-center text-sm font-serif font-semibold">
            New to Boi Exchange?{" "}
            <Link className="text-secondary font-bold" to="/signup">
              Sign Up
            </Link>
          </p>

          <h1 className="font-mono text-xs text-center font-bold">
            Admin - Email: admin@boi.exchange <br />
            Librarian - Email: librarian@boi.exchange <br />
            For both user Password: 123456
          </h1>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-active btn-success text-white font-bold w-full max-w-xs hover:bg-white hover:text-success border-2 font-serif normal-case"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
