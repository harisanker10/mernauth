import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { useState } from "react";

function Sidebar({fields,viewSetter}) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="sticky left-0 top-0 flex h-screen w-[16vw] flex-col items-center bg-slate-200">
      <ProfileCard user={user}  />
      <h2 className="cursor-pointer hover:underline" onClick={() => viewSetter("editProfile")}>Edit details</h2>
      
    </div>
  );
}

export default Sidebar;
