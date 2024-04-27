import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import edit from "../../assets/images/logo/edit.png";
import profile from "../../assets/images/logo/userProfile.png";
import verified from "../../assets/images/logo/verify.png";
import auth from "../../firebase.init";
import useDbUser from "../../hooks/useDbUser";
import Loading from "../Loading/Loading";
const Profile = () => {
  const [dbUser] = useDbUser();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="flex justify-center items-center w-full px-10 mt-5">
        {user?.photoURL && (
          <img className="w-40 rounded-full" src={user?.photoURL} alt="" />
        )}
        {dbUser?.photoURL ? (
          <img className="w-40 rounded-full" src={dbUser?.photoURL} alt="" />
        ) : (
          !user?.photoURL && (
            <img className="w-40 rounded-full" src={profile} alt="" />
          )
        )}
      </div>
      <div className="flex justify-center items-center py-5 px-10">
        <Link
          className="btn btn-sm bg-black hover:rounded-full hover:border-1 hover:bg-black hover:shadow-inner hover:shadow-white"
          to="/editProfile"
        >
          Update Profile <img className="w-4 pl-1" src={edit} alt="" />{" "}
        </Link>
      </div>
      <div>
        <div className="flex justify-center">
          <h1 className="text-center font-bold font-serif text-2xl">
            {user?.displayName}
          </h1>
          {user?.emailVerified && <img className="w-8" src={verified} alt="" />}
        </div>
        <h2 className="text-center font-bold font-serif text-xl">
          Phone:{" "}
          <span className="font-normal font-mono">
            {dbUser?.phoneNumber ? dbUser?.phoneNumber : "not updated"}
          </span>
        </h2>
        <h2 className="text-center font-bold font-serif text-xl">
          Email: <span className="font-normal font-mono">{user?.email}</span>
        </h2>
        <h3 className="text-center font-bold font-serif text-xl">
          Location:{" "}
          <span className="font-normal font-mono">
            {dbUser?.userLocation ? dbUser?.userLocation : "not updated"}
          </span>
        </h3>
      </div>
    </>
  );
};

export default Profile;
