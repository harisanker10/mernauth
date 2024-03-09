import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ role }) {
  const authToken = useSelector((state) => state.auth.token);
  const currRole = useSelector((state) => state.auth?.user?.role);
  const location = useLocation();
  return (
    <>
      {authToken && currRole === role ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location }} />
      )}
    </>
  );
}

export default ProtectedRoute;
