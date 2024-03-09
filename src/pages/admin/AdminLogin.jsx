import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../slices/auth/authSlice";
import { useAdminLoginMutation } from "../../slices/auth/authApiSlice";

function AdminLogin() {
  const [login, states] = useAdminLoginMutation();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { isLoading, isError, error } = states;
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await login({ user: formData });
    console.log('saddsdkfklsdfklsfs',data);
    if (data) {
      dispatch(setToken(data.token));
      dispatch(setUser({...data.user}));
      navigate("/");
    }
  };

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <div className="w-100 flex h-screen items-center justify-center bg-gray-50">
          <div className="mx-auto flex w-2/3 flex-col items-center rounded-lg border border-t-gray-100 bg-white px-8 py-8 shadow-lg md:w-[500px] md:py-16">
            <h1 className="md:text3xl mb-10 text-2xl font-bold">
              Admin Log In
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="mb-2 box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none"
                placeholder="Username or Email"
                onChange={handleChange}
                name="username"
              />
              <input
                type="password"
                className="mb-2 box-border w-full rounded-lg border border-gray-200 px-6 py-2 outline-none"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />

              <button
                className="my-2  box-border flex h-10 w-full  justify-center rounded-lg bg-blue-600 px-6 py-2 font-bold text-white outline-none transition-all hover:bg-blue-700"
                type="submit"
              >
                {isLoading ? (
                  <Oval
                    color="#000000"
                    height={24}
                    strokeWidth={0}
                    strokeWidthSecondary={6}
                    wrapperClass="my-auto"
                  />
                ) : (
                  "Log In"
                )}
              </button>
              <div
                className={`my-4 h-0 w-full rounded border-red-300 bg-red-100 p-0 px-4 text-red-500 shadow-md shadow-gray-100 transition-all delay-1000 ${isError ? "h-auto border py-2" : null}`}
              >
                {error?.data?.message}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminLogin;
