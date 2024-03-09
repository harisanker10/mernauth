import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, setUser } from "../slices/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  console.log(user);
  const logOut = () => {
    dispatch(setUser(null));
    dispatch(removeToken());
    navigate("/");
  };
  return (
    <>
      <div className="flex h-14 w-full items-center justify-end bg-slate-800 px-6">
        {user ? (
          <>
            <button className="group relative flex items-center rounded-full p-1 px-0 transition-all focus-within:rounded-b-none focus-within:rounded-t-lg focus-within:bg-slate-700 hover:bg-slate-700">
              <div className="group">
                <div className="mx-4 flex items-center justify-between gap-2 text-base font-semibold text-white">
                  <div className=" h-8 w-8 overflow-hidden rounded-full bg-white md:h-9 md:w-9">
                    <img
                      className="object-cover w-full h-full"
                      src={user?.avatar}
                      alt="avatar"
                    />
                  </div>
                  <span className="hidden sm:block">{user?.username}</span>
                </div>
                <div className="absolute top-[100%] h-0 w-full overflow-hidden rounded-b-lg bg-slate-700 shadow-lg transition-all group-focus:h-56">
                  {user?.role === "user" ? (
                    <Link
                      to="/profile"
                      className="w-full font-semibold text-white hover:bg-slate-600"
                    >
                      Profile
                    </Link>
                  ) : (
                    <Link
                      to="/admin/dashboard"
                      className="w-full font-semibold text-white hover:bg-slate-600"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div
                    onClick={logOut}
                    className="w-full font-semibold text-white hover:bg-red-600 py-1"
                  >
                    Log Out
                  </div>
                </div>
              </div>
            </button>
          </>
        ) : (
          <>
            <Link
              className="mx-4 text-sm font-bold text-white md:text-base"
              to="/login"
            >
              Log In
            </Link>
            <Link className="btn-primary" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
