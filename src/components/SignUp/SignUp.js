import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  let signInError;

  if (user || gUser) {
    navigate("/");
  }
  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-600 pb-2">
        <small>
          {error?.message || gError?.message || updateError?.message}
        </small>
      </p>
    );
  }
  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-gray-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold font-serif">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name field  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-serif">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs font-serif"
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-600 font-serif">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            {/* Email field  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-serif">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a Valid Email Address",
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
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 character or more longer",
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
            {/* Sign Up Button  */}
            <input
              className="btn btn-active btn-success text-white font-bold w-full max-w-xs hover:bg-white hover:text-success border-2 font-serif normal-case"
              type="submit"
              value="Sign Up"
            />
          </form>

          <p className="text-center font-serif text-sm">
            Already have an account?{" "}
            <Link className="text-secondary font-bold" to="/login">
              Please Login!
            </Link>
          </p>

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

export default SignUp;
