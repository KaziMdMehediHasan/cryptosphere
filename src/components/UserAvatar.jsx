import React from "react";
import useAuth from "../hooks/useAuth";

const UserAvatar = () => {
  const { user } = useAuth();
  return (
    <>
      {user.email && (
        <div className="user_avatar">
          <img
            className="user_img"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
      )}
    </>
  );
};

export default UserAvatar;