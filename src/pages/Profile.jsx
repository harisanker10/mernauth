import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { EditProfile } from "../components/EditProfile";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Profile() {
  const [view, setView] = useState(null);
  const renderView = (view) => {
    switch (view) {
      case "editProfile":
        return <EditProfile />;
      default:
        return <h1>Elon ma</h1>;
    }
  };
  return (
    <>
      <div className="flex">
        <Sidebar viewSetter={setView} />
        {renderView(view)}
      </div>
    </>
  );
}

export default Profile;
